# Smart Contracts Documentation

This document details the deployed smart contracts for the Base Cartel application.

## 1. CartelCore.sol
**Role**: Main game logic controller. Manages user interactions, raids, and referrals.

### Functions
- `constructor(address _shares, address _pot, address _usdc)`
  - Initializes the contract with references to Shares, Pot, and USDC contracts.
- `join(address referrer) external`
  - Allows a user to join the cartel.
  - **Cost**: `JOIN_FEE` (0.01 USDC).
  - **Effect**: Mints `JOIN_SHARES` to user. Handles referral bonuses.
- `getReferralCount(address user) external view returns (uint256)`
  - Returns the number of successful referrals for a user.
- `claimYield() external`
  - Allows share owners to claim their share of the pot's yield.
- `raid(address target) external`
  - Initiates a raid on a target.
  - **Cost**: `RAID_FEE` (0.005 USDC).
  - **Effect**: Emits `Raid` event.
- `betray() external`
  - Allows a user to attempt to betray the cartel for a payout.
  - **Effect**: Burns shares, potentially pays out, emits `Betrayal`.

### Events
- `Join(address indexed player, address indexed referrer, uint256 shares, uint256 fee)`
- `Raid(address indexed raider, address indexed target, uint256 amountStolen, bool success, uint256 fee)`
- `Betrayal(address indexed traitor, uint256 amountStolen)`

---

## 2. CartelPot.sol
**Role**: Treasury management. Holds USDC funds.

### Functions
- `constructor(address _usdc)`
  - Initializes with the USDC token address.
- `setCore(address _core) external onlyOwner`
  - Sets the address of the authorized CartelCore contract.
- `depositFrom(address from, uint256 amount) external onlyCore`
  - Pulls USDC from a user into the pot. Only callable by Core.
- `withdraw(address to, uint256 amount) external onlyOwner`
  - Admin function to withdraw funds (or for future payout logic).
- `getBalance() external view returns (uint256)`
  - Returns the current USDC balance of the pot.

### Events
- `Deposit(address indexed from, uint256 amount)`
- `Withdrawal(address indexed to, uint256 amount)`

---

## 3. CartelShares.sol
**Role**: Membership token (ERC-1155).

### Functions
- `constructor()`
  - Initializes the ERC-1155 collection.
- `mint(address account, uint256 amount, bytes memory data) public onlyOwner`
  - Mints new shares to a user. Only callable by Owner (Core).
- `burn(address account, uint256 amount) public onlyOwner`
  - Burns shares from a user. Only callable by Owner (Core).
- `setURI(string memory newuri) public onlyOwner`
  - Updates the metadata URI.

