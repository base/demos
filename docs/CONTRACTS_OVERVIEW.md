# 📜 Smart Contract Overview

This document provides a technical overview of the Base Cartel smart contract system.

## 1. CartelCore.sol
**Role:** The main game logic controller. Handles joining, raiding, fees, and profit distribution.

### Storage Variables
*   `sharesContract` (CartelShares): Reference to the ERC1155 shares contract.
*   `pot` (CartelPot): Reference to the treasury contract holding USDC.
*   `usdc` (IERC20): Reference to the USDC token contract.
*   `JOIN_SHARES` (uint256): Constant amount of shares (100) minted upon joining.
*   `currentSeason` (uint256): Tracks the current game season (default: 1).
*   `seasonParticipation` (mapping): Tracks if a user has joined a specific season.
*   `referredBy` (mapping): Stores who invited whom.
*   `referralCount` (mapping): Tracks how many users each person has invited.
*   `REFERRAL_BONUS` (uint256): Shares given to referrer (20).
*   `JOIN_FEE` (uint256): Cost to join (0 for Phase 1).
*   `RAID_FEE` (uint256): Cost to raid (5000 = 0.005 USDC).
*   `inviteOnly` (bool): If true, requires a valid referrer to join.
*   `invites` (mapping): Tracks number of invites each user has available.
*   `authorizedAgents` (mapping): Addresses allowed to execute actions on behalf of users.
*   `dailyRevenuePool` (uint256): Accumulates fees for daily distribution.
*   `lastDistributionTime` (uint256): Timestamp of last profit distribution.
*   `cumulativeRewardPerShare` (uint256): Global tracker for profit per share.
*   `pendingRewards` (mapping): Unclaimed rewards for each user.

### Functions
*   `setAgent(address agent, bool status)`
    *   **Admin:** Authorizes or revokes an address (e.g., AgentVault) to act as an agent.
*   `setFees(uint256 _joinFee, uint256 _raidFee)`
    *   **Admin:** Updates the cost to join or raid.
*   `setInviteOnly(bool _enabled)`
    *   **Admin:** Toggles the invite-only requirement.
*   `grantInvites(address user, uint256 amount)`
    *   **Admin:** Manually gives invites to a specific user.
*   `join(address referrer)`
    *   **Public:** Main entry point. Mints initial shares, handles fees, and processes referrals.
*   `getReferralCount(address user)`
    *   **View:** Returns the number of successful referrals for a user.
*   `distributeDailyProfits()`
    *   **Public:** Calculates reward per share based on `dailyRevenuePool` and resets the pool. Callable once every 24 hours.
*   `claimProfit()`
    *   **Public:** Claims any pending profit share rewards for the caller.
*   `claimProfitFor(address user)`
    *   **Agent:** Claims profit share rewards on behalf of a user (for gasless/agent flows).
*   `getPendingProfit(address user)`
### Functions
*   `setMinter(address _minter)`
    *   **Admin:** Sets the address allowed to mint tokens.
*   `mint(address account, uint256 amount, bytes memory data)`
    *   **Minter Only:** Mints new shares to an account.
*   `burn(address account, uint256 amount)`
    *   **Minter Only:** Burns shares from an account.
*   `setURI(string memory newuri)`
    *   **Admin:** Updates the metadata URI for the tokens.

---

## 3. CartelPot.sol
**Role:** The treasury vault that holds the actual USDC funds.

### Storage Variables
*   `usdc` (IERC20): Reference to the USDC token.
*   `core` (address): Address of the CartelCore contract.

### Functions
*   `setCore(address _core)`
    *   **Admin:** Sets the authorized Core contract address.
*   `depositFrom(address from, uint256 amount)`
    *   **Core Only:** Pulls USDC from a user into the Pot (requires approval).
*   `withdraw(address to, uint256 amount)`
    *   **Admin:** Sends USDC from the Pot to a destination (used for payouts).
*   `getBalance()`
    *   **View:** Returns the current USDC balance of the Pot.

---

## 4. AgentVault.sol
**Role:** Handles "Session Keys" and gasless transactions via EIP-712 signatures.

### Storage Variables
*   `usdc` (IERC20): Reference to USDC.
*   `cartelCore` (ICartelCore): Reference to the main game contract.
*   `balances` (mapping): Tracks user USDC deposits allocated for agent actions.
*   `nonces` (mapping): Replay protection for signatures.

### Functions
*   `deposit(uint256 amount)`
    *   **Public:** User deposits USDC into the vault to fund future agent actions.
*   `withdraw(uint256 amount)`
    *   **Public:** User withdraws their unused USDC.
*   `executeAction(address user, string action, bytes data, uint256 deadline, uint8 v, bytes32 r, bytes32 s)`
    *   **Public (Relayer):** Executes a signed action (like "raid") on behalf of a user. Verifies signature, deducts fee from vault balance, and calls CartelCore.
