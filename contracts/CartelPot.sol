// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IERC20.sol";

contract CartelPot is Ownable {
    IERC20 public immutable usdc;
    address public core;
    
    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);

    constructor(address _usdc) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
    }

    modifier onlyCore() {
        require(msg.sender == core, "Only CartelCore");
        _;
    }

    function setCore(address _core) external onlyOwner {
        core = _core;
    }

    function depositFrom(address from, uint256 amount) external onlyCore {
        require(usdc.transferFrom(from, address(this), amount), "Transfer failed");
        emit Deposit(from, amount);
    }

    function withdraw(address to, uint256 amount) external onlyOwner {
        require(usdc.transfer(to, amount), "Transfer failed");
        emit Withdrawal(to, amount);
    }

    function getBalance() external view returns (uint256) {
        return usdc.balanceOf(address(this));
    }
}
