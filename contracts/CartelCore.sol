// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CartelShares.sol";
import "./CartelPot.sol";
import "./IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CartelCore is Ownable, ReentrancyGuard {
    CartelShares public sharesContract;
    CartelPot public pot;
    IERC20 public immutable usdc;
    
    uint256 public constant JOIN_SHARES = 100;
    
    uint256 public currentSeason = 1;
    mapping(address => mapping(uint256 => bool)) public seasonParticipation;
    
    // Referral system
    mapping(address => address) public referredBy;
    mapping(address => uint256) public referralCount;
    uint256 public constant REFERRAL_BONUS = 20;

    // Fees (USDC, 6 decimals)
    uint256 public JOIN_FEE = 0; // Free for Phase 1
    uint256 public RAID_FEE = 5000;  // 0.005 USDC
    uint256 public HIGH_STAKES_RAID_FEE = 15000; // 0.015 USDC (3x normal)

    // Raid Config
    uint256 public constant NORMAL_RAID_STEAL_BPS = 1000; // 10%
    uint256 public constant HIGH_STAKES_STEAL_BPS = 2000; // 20%
    uint256 public constant HIGH_STAKES_SELF_PENALTY_BPS = 300; // 3%
    
    // Retire Config
    uint256 public constant RETIRE_PAYOUT_BPS = 2500; // 25%
    mapping(uint256 => mapping(address => bool)) public retiredInSeason;

    // Invite System
    bool public inviteOnly = true;
    uint256 public constant INITIAL_INVITES = 3;
    mapping(address => uint256) public invites;

    // Auto-Agent
    mapping(address => bool) public authorizedAgents;

    // Daily Revenue Pool (Fee-Based Profit Share)
    uint256 public dailyRevenuePool;
    uint256 public lastDistributionTime;
    uint256 public constant DISTRIBUTION_INTERVAL = 24 hours;

    // Claim-based distribution (gas efficient)
    uint256 public cumulativeRewardPerShare; // scaled by 1e18
    mapping(address => uint256) public lastClaimedRewardPerShare;
    mapping(address => uint256) public pendingRewards;

    event Join(address indexed player, address indexed referrer, uint256 shares, uint256 fee);
    event Raid(address indexed raider, address indexed target, uint256 amountStolen, bool success, uint256 fee);
    event Betrayal(address indexed traitor, uint256 amountStolen);
    event InvitesGranted(address indexed user, uint256 amount);
    event RevenueAdded(uint256 amount, string source);
    event ProfitDistributed(uint256 totalAmount, uint256 rewardPerShare);
    event ProfitClaimed(address indexed user, uint256 amount);
    event HighStakesRaid(address indexed attacker, address indexed target, uint256 stolenShares, uint256 selfPenaltyShares, uint256 feePaid);
    event RetiredFromCartel(address indexed user, uint256 indexed season, uint256 burnedShares, uint256 payout);

    constructor(address _shares, address _pot, address _usdc) Ownable(msg.sender) {
        sharesContract = CartelShares(_shares);
        pot = CartelPot(_pot);
        usdc = IERC20(_usdc);
        
        // Owner gets infinite invites
        invites[msg.sender] = type(uint256).max;
        lastDistributionTime = block.timestamp;
    }

    modifier onlyAgent() {
        require(authorizedAgents[msg.sender], "Not authorized agent");
        _;
    }

    function setAgent(address agent, bool status) external onlyOwner {
        authorizedAgents[agent] = status;
    }

    function setFees(uint256 _joinFee, uint256 _raidFee, uint256 _highStakesRaidFee) external onlyOwner {
        JOIN_FEE = _joinFee;
        RAID_FEE = _raidFee;
        HIGH_STAKES_RAID_FEE = _highStakesRaidFee;
    }

    // Invite System Admin
    function setInviteOnly(bool _enabled) external onlyOwner {
        inviteOnly = _enabled;
    }

    function grantInvites(address user, uint256 amount) external onlyOwner {
        invites[user] += amount;
        emit InvitesGranted(user, amount);
    }

    function join(address referrer) external nonReentrant {
        require(sharesContract.balanceOf(msg.sender, 1) == 0, "Already joined");

        // Invite Logic
        if (inviteOnly) {
            require(referrer != address(0), "Referrer required in invite-only mode");
            require(invites[referrer] > 0, "Referrer has no invites left");
            
            // Decrement referrer's invites
            invites[referrer]--;
            
            // Grant invites to new user
            invites[msg.sender] = INITIAL_INVITES;
        }

        // Fee Logic
        if (JOIN_FEE > 0) {
            pot.depositFrom(msg.sender, JOIN_FEE);
            dailyRevenuePool += JOIN_FEE;
            emit RevenueAdded(JOIN_FEE, "join");
        }
        
        // Mint initial shares to the user
        sharesContract.mint(msg.sender, JOIN_SHARES, "");
        
        // Track referral if valid
        if (referrer != address(0) && referrer != msg.sender) {
            referredBy[msg.sender] = referrer;
            referralCount[referrer]++;
            
            // Off-chain reward system is now used. 
            // We do NOT mint on-chain shares to referrer anymore to prevent inflation.
        }
        
        // Mark user as participant for the current season
        seasonParticipation[msg.sender][currentSeason] = true;
        
        emit Join(msg.sender, referrer, JOIN_SHARES, JOIN_FEE);
    }

    function getReferralCount(address user) external view returns (uint256) {
        return referralCount[user];
    }

    // Daily Profit Distribution
    function distributeDailyProfits() external {
        require(block.timestamp >= lastDistributionTime + DISTRIBUTION_INTERVAL, "Too soon");
        require(dailyRevenuePool > 0, "No revenue to distribute");
        
        uint256 totalShares = sharesContract.totalSupply(1);
        require(totalShares > 0, "No shares exist");
        
        // Calculate reward per share (scaled by 1e18 for precision)
        uint256 rewardPerShare = (dailyRevenuePool * 1e18) / totalShares;
        cumulativeRewardPerShare += rewardPerShare;
        
        emit ProfitDistributed(dailyRevenuePool, rewardPerShare);
        
        dailyRevenuePool = 0;
        lastDistributionTime = block.timestamp;
    }

    function claimProfit() external nonReentrant {
        _updatePendingRewards(msg.sender);
        
        uint256 amount = pendingRewards[msg.sender];
        require(amount > 0, "No profits to claim");
        
        pendingRewards[msg.sender] = 0;
        pot.withdraw(msg.sender, amount);
        
        emit ProfitClaimed(msg.sender, amount);
    }

    function claimProfitFor(address user) external nonReentrant onlyAgent {
        _updatePendingRewards(user);
        
        uint256 amount = pendingRewards[user];
        require(amount > 0, "No profits to claim");
        
        pendingRewards[user] = 0;
        pot.withdraw(user, amount);
        
        emit ProfitClaimed(user, amount);
    }

    function _updatePendingRewards(address user) internal {
        uint256 userShares = sharesContract.balanceOf(user, 1);
        if (userShares == 0) return;
        
        uint256 rewardDelta = cumulativeRewardPerShare - lastClaimedRewardPerShare[user];
        uint256 newRewards = (userShares * rewardDelta) / 1e18;
        
        pendingRewards[user] += newRewards;
        lastClaimedRewardPerShare[user] = cumulativeRewardPerShare;
    }

    function getPendingProfit(address user) external view returns (uint256) {
        uint256 userShares = sharesContract.balanceOf(user, 1);
        if (userShares == 0) return pendingRewards[user];
        
        uint256 rewardDelta = cumulativeRewardPerShare - lastClaimedRewardPerShare[user];
        uint256 newRewards = (userShares * rewardDelta) / 1e18;
        
        return pendingRewards[user] + newRewards;
    }

    // Admin sponsor function
    function sponsorRevenue(uint256 amount) external {
        usdc.transferFrom(msg.sender, address(pot), amount);
        dailyRevenuePool += amount;
        emit RevenueAdded(amount, "sponsor");
    }

    function raid(address target) external nonReentrant {
        _raid(msg.sender, target);
    }

    function raidFor(address user, address target) external nonReentrant onlyAgent {
        _raid(user, target);
    }

    function _raid(address raider, address target) internal {
        require(raider != target, "Cannot raid self");
        // Collect raid fee
        pot.depositFrom(msg.sender, RAID_FEE);
        dailyRevenuePool += RAID_FEE;
        emit RevenueAdded(RAID_FEE, "raid");
        
        // Steal shares logic
        uint256 targetShares = sharesContract.balanceOf(target, 1);
        uint256 stolen = (targetShares * NORMAL_RAID_STEAL_BPS) / 10000;
        
        bool success = false;
        if (stolen > 0) {
            // Move shares: Burn from target, Mint to raider
            // This works because CartelCore is the minter/owner of Shares contract
            sharesContract.burn(target, stolen);
            sharesContract.mint(raider, stolen, "");
            success = true;
        }
        
        emit Raid(raider, target, stolen, success, RAID_FEE);
    }

    function highStakesRaid(address target) external {
        _highStakesRaid(msg.sender, target);
    }

    function highStakesRaidFor(address user, address target) external {
        require(authorizedAgents[msg.sender], "Not authorized agent");
        _highStakesRaid(user, target);
    }

    function _highStakesRaid(address attacker, address target) internal {
        require(attacker != target, "Cannot raid self");
        require(target != address(0), "Invalid target");

        // 1. Get current share balances
        uint256 attackerShares = sharesContract.balanceOf(attacker, 1);
        uint256 targetShares   = sharesContract.balanceOf(target, 1);

        require(targetShares > 0, "Target has no shares");
        require(attackerShares > 0, "Attacker has no shares");

        // 2. Charge high-stakes raid fee
        pot.depositFrom(msg.sender, HIGH_STAKES_RAID_FEE);
        dailyRevenuePool += HIGH_STAKES_RAID_FEE;
        emit RevenueAdded(HIGH_STAKES_RAID_FEE, "high_stakes_raid");

        // 3. Calculate shares to steal
        uint256 stealAmount = (targetShares * HIGH_STAKES_STEAL_BPS) / 10000;
        if (stealAmount == 0 && targetShares > 0) {
            stealAmount = 1;
        }
        
        // 4. Calculate self-penalty
        uint256 selfPenalty = (attackerShares * HIGH_STAKES_SELF_PENALTY_BPS) / 10000;

        // 5. Apply share movements
        if (stealAmount > 0) {
            sharesContract.burn(target, stealAmount);
            sharesContract.mint(attacker, stealAmount, "");
        }

        if (selfPenalty > 0) {
            sharesContract.burn(attacker, selfPenalty);
        }

        emit HighStakesRaid(attacker, target, stealAmount, selfPenalty, HIGH_STAKES_RAID_FEE);
    }

    function retireFromCartel() external nonReentrant {
        _retireFromCartel(msg.sender);
    }

    function retireFromCartelFor(address user) external nonReentrant {
        require(authorizedAgents[msg.sender], "Not authorized agent");
        _retireFromCartel(user);
    }

    function _retireFromCartel(address user) internal {
        uint256 season = currentSeason;
        require(!retiredInSeason[season][user], "Already retired this season");
        require(seasonParticipation[season][user], "User not active in season");

        // 1. Update profit share
        _updatePendingRewards(user);

        uint256 userShares = sharesContract.balanceOf(user, 1);
        require(userShares > 0, "No shares to retire");

        uint256 totalShares = sharesContract.totalSupply(1);
        require(totalShares > 0, "No shares in system");

        // 2. Compute payout
        uint256 potBalance = pot.getBalance();
        uint256 fullSharePayout = (potBalance * userShares) / totalShares;
        uint256 payout = (fullSharePayout * RETIRE_PAYOUT_BPS) / 10000;

        // 3. Burn all user shares
        sharesContract.burn(user, userShares);

        // 4. Mark retired
        retiredInSeason[season][user] = true;

        // 5. Transfer payout
        if (payout > 0) {
            pot.withdraw(user, payout);
        }

        emit RetiredFromCartel(user, season, userShares, payout);
    }
}
