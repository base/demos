// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IERC20.sol";

interface ICartelCore {
    function raidFor(address user, address target) external;
    function highStakesRaidFor(address user, address target) external;
    function claimYieldFor(address user) external;
    function RAID_FEE() external view returns (uint256);
    function HIGH_STAKES_RAID_FEE() external view returns (uint256);
}

contract AgentVault is EIP712, Ownable {
    IERC20 public immutable usdc;
    ICartelCore public cartelCore;

    // User balances in the vault
    mapping(address => uint256) public balances;

    // Replay protection for signatures
    mapping(address => uint256) public nonces;

    // Typehash for delegation
    // ExecuteAction(address user,string action,bytes data,uint256 nonce,uint256 deadline)
    bytes32 private constant ACTION_TYPEHASH = keccak256("ExecuteAction(address user,string action,bytes data,uint256 nonce,uint256 deadline)");

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event ActionExecuted(address indexed user, string action, uint256 fee);

    constructor(address _usdc, address _cartelCore) EIP712("BaseCartelAgent", "1") Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        cartelCore = ICartelCore(_cartelCore);
        
        // Approve CartelCore to spend unlimited USDC from this vault
        // This is safe because CartelCore only pulls fees when we call it
        usdc.approve(_cartelCore, type(uint256).max);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        balances[msg.sender] += amount;
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        balances[msg.sender] -= amount;
        require(usdc.transfer(msg.sender, amount), "Transfer failed");
        emit Withdraw(msg.sender, amount);
    }

    // Execute action on behalf of user
    function executeAction(
        address user,
        string calldata action, // "raid" or "claim"
        bytes calldata data,    // target address for raid (abi encoded)
        uint256 deadline,
        uint8 v, bytes32 r, bytes32 s
    ) external {
        // 1. Verify Signature
        require(block.timestamp <= deadline, "Signature expired");
        
        bytes32 structHash = keccak256(abi.encode(
            ACTION_TYPEHASH,
            user,
            keccak256(bytes(action)),
            keccak256(data),
            nonces[user]++,
            deadline
        ));
        
        bytes32 hash = _hashTypedDataV4(structHash);
        address signer = ECDSA.recover(hash, v, r, s);
        require(signer == user, "Invalid signature");

        // 2. Execute Action
        if (keccak256(bytes(action)) == keccak256(bytes("raid"))) {
            address target = abi.decode(data, (address));
            
            // Get fee dynamically from CartelCore
            uint256 fee = cartelCore.RAID_FEE();
            
            require(balances[user] >= fee, "Insufficient user balance for raid fee");
            balances[user] -= fee;
            
            cartelCore.raidFor(user, target);
            emit ActionExecuted(user, "raid", fee);
        } 
        else if (keccak256(bytes(action)) == keccak256(bytes("highStakesRaid"))) {
            address target = abi.decode(data, (address));
            
            // Get fee dynamically
            uint256 fee = cartelCore.HIGH_STAKES_RAID_FEE();
            
            require(balances[user] >= fee, "Insufficient user balance for high stakes raid fee");
            balances[user] -= fee;
            
            cartelCore.highStakesRaidFor(user, target);
            emit ActionExecuted(user, "highStakesRaid", fee);
        }
        else if (keccak256(bytes(action)) == keccak256(bytes("claim"))) {
             cartelCore.claimYieldFor(user);
             emit ActionExecuted(user, "claim", 0);
        }
        else {
            revert("Unknown action");
        }
    }
}
