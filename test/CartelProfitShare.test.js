const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Cartel Profit Share Verification", function () {
    let Core, Pot, Shares, MockUSDC;
    let core, pot, shares, usdc;
    let owner, userA, userB;

    const JOIN_SHARES = 100n;

    beforeEach(async function () {
        [owner, userA, userB] = await ethers.getSigners();

        // Deploy Mock USDC
        MockUSDC = await ethers.getContractFactory("MockUSDC");
        usdc = await MockUSDC.deploy();
        await usdc.waitForDeployment();

        // Deploy Shares
        Shares = await ethers.getContractFactory("CartelShares");
        shares = await Shares.deploy();
        await shares.waitForDeployment();

        // Deploy Pot
        Pot = await ethers.getContractFactory("CartelPot");
        pot = await Pot.deploy(await usdc.getAddress());
        await pot.waitForDeployment();

        // Deploy Core
        Core = await ethers.getContractFactory("CartelCore");
        core = await Core.deploy(
            await shares.getAddress(),
            await pot.getAddress(),
            await usdc.getAddress()
        );
        await core.waitForDeployment();

        // Setup permissions
        await shares.transferOwnership(await core.getAddress());
        await pot.setCore(await core.getAddress());

        // Mint USDC to users and owner
        await usdc.mint(userA.address, 100000n * 10n ** 6n);
        await usdc.mint(userB.address, 100000n * 10n ** 6n);
        await usdc.mint(owner.address, 100000n * 10n ** 6n);

        // Approve Core
        await usdc.connect(userA).approve(await core.getAddress(), ethers.MaxUint256);
        await usdc.connect(userB).approve(await core.getAddress(), ethers.MaxUint256);
        await usdc.connect(owner).approve(await core.getAddress(), ethers.MaxUint256);

        // Disable invite only
        await core.setInviteOnly(false);

        // Users join
        await core.connect(userA).join(ethers.ZeroAddress);
        await core.connect(userB).join(ethers.ZeroAddress);
    });

    it("1. Simple distribution: Equal shares (100 vs 100), 20 USDC revenue", async function () {
        // Inject 20 USDC revenue
        const revenue = 20n * 10n ** 6n;
        await core.connect(owner).sponsorRevenue(revenue);

        // Check pool before
        expect(await core.dailyRevenuePool()).to.equal(revenue);

        // Fast forward 24h
        await ethers.provider.send("evm_increaseTime", [86400]);
        await ethers.provider.send("evm_mine");

        // Distribute
        await core.distributeDailyProfits();

        // Check pool reset
        expect(await core.dailyRevenuePool()).to.equal(0n);

        // Check pending rewards
        // A: 100/200 * 20 = 10 USDC
        // B: 100/200 * 20 = 10 USDC
        const expectedReward = revenue / 2n;

        expect(await core.getPendingProfit(userA.address)).to.equal(expectedReward);
        expect(await core.getPendingProfit(userB.address)).to.equal(expectedReward);
    });

    it("2. Uneven distribution: A(150) vs B(50), 20 USDC revenue", async function () {
        // A raids B 5 times to shift shares
        // 100 -> 110 -> 121 -> 133 -> 146 -> 160 (approx)
        // Wait, raid is 10% steal.
        // Let's just mint extra shares to A for simplicity if we could, but we can't.
        // So let's raid.
        // A raids B.
        // B: 100 -> 90. A: 100 -> 110.
        // B: 90 -> 81. A: 110 -> 119.
        // B: 81 -> 73. A: 119 -> 127.
        // B: 73 -> 66. A: 127 -> 134.
        // B: 66 -> 60. A: 134 -> 140.
        // Close enough to uneven.

        // Actually, let's just raid once.
        // A: 110, B: 90. Total: 200.
        // Revenue: 20 USDC.
        // A: 110/200 * 20 = 11 USDC.
        // B: 90/200 * 20 = 9 USDC.

        await core.connect(userA).raid(userB.address);

        // Inject 20 USDC revenue (plus the raid fee that was added!)
        // Raid fee is 0.005 USDC.
        // Let's ignore the raid fee for the calculation by sponsoring a large amount relative to fee?
        // Or just calculate exact expected.
        // Pool = 20 USDC + 0.005 USDC.
        const sponsorAmount = 20n * 10n ** 6n;
        await core.connect(owner).sponsorRevenue(sponsorAmount);

        const totalPool = await core.dailyRevenuePool();

        // Fast forward
        await ethers.provider.send("evm_increaseTime", [86400]);
        await ethers.provider.send("evm_mine");

        await core.distributeDailyProfits();

        const sharesA = await shares.balanceOf(userA.address, 1);
        const sharesB = await shares.balanceOf(userB.address, 1);
        const totalShares = await shares.totalSupply(1);

        const expectedA = (totalPool * sharesA) / totalShares;
        const expectedB = (totalPool * sharesB) / totalShares;

        expect(await core.getPendingProfit(userA.address)).to.equal(expectedA);
        expect(await core.getPendingProfit(userB.address)).to.equal(expectedB);

        // Verify A got more than B
        expect(expectedA).to.be.gt(expectedB);
    });
});
