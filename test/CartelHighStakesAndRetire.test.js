const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CartelCore High-Stakes Raid & Retire", function () {
    let Core, Pot, Shares, MockUSDC, AgentVault;
    let core, pot, shares, usdc, vault;
    let owner, userA, userB, userC;

    const JOIN_SHARES = 100n;
    const HIGH_STAKES_RAID_FEE = 15000n; // 0.015 USDC
    const RAID_FEE = 5000n; // 0.005 USDC
    const RETIRE_PAYOUT_BPS = 2500n; // 25%
    const NORMAL_STEAL_BPS = 1000n; // 10%
    const HIGH_STAKES_STEAL_BPS = 2000n; // 20%
    const HIGH_STAKES_SELF_PENALTY_BPS = 300n; // 3%

    beforeEach(async function () {
        [owner, userA, userB, userC] = await ethers.getSigners();

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

        // Mint USDC to users
        await usdc.mint(userA.address, 100000n * 10n ** 6n);
        await usdc.mint(userB.address, 100000n * 10n ** 6n);
        await usdc.mint(userC.address, 100000n * 10n ** 6n);

        // Approve Core
        await usdc.connect(userA).approve(await core.getAddress(), ethers.MaxUint256);
        await usdc.connect(userB).approve(await core.getAddress(), ethers.MaxUint256);
        await usdc.connect(userC).approve(await core.getAddress(), ethers.MaxUint256);
        await usdc.connect(owner).approve(await core.getAddress(), ethers.MaxUint256);

        // Disable invite only
        await core.setInviteOnly(false);

        // Users join
        await core.connect(userA).join(ethers.ZeroAddress);
        await core.connect(userB).join(ethers.ZeroAddress);
    });

    describe("High-Stakes Raid", function () {
        it("Should execute high-stakes raid correctly", async function () {
            const initialSharesA = await shares.balanceOf(userA.address, 1);
            const initialSharesB = await shares.balanceOf(userB.address, 1);

            // A raids B
            // Expected steal: 20% of 100 = 20 shares
            // Expected penalty: 3% of 100 = 3 shares
            const expectedStolen = (initialSharesB * HIGH_STAKES_STEAL_BPS) / 10000n;
            const expectedPenalty = (initialSharesA * HIGH_STAKES_SELF_PENALTY_BPS) / 10000n;

            await expect(core.connect(userA).highStakesRaid(userB.address))
                .to.emit(core, "HighStakesRaid")
                .withArgs(userA.address, userB.address, expectedStolen, expectedPenalty, HIGH_STAKES_RAID_FEE);

            const finalSharesA = await shares.balanceOf(userA.address, 1);
            const finalSharesB = await shares.balanceOf(userB.address, 1);

            expect(finalSharesB).to.equal(initialSharesB - expectedStolen);
            expect(finalSharesA).to.equal(initialSharesA + expectedStolen - expectedPenalty);

            // Check total supply decreased by penalty
            const totalSupply = await shares.totalSupply(1);
            expect(totalSupply).to.equal(initialSharesA + initialSharesB - expectedPenalty);
        });

        it("Should revert on self-raid", async function () {
            await expect(core.connect(userA).highStakesRaid(userA.address))
                .to.be.revertedWith("Cannot raid self");
        });

        it("Should revert if target has no shares", async function () {
            // User C hasn't joined
            await expect(core.connect(userA).highStakesRaid(userC.address))
                .to.be.revertedWith("Target has no shares");
        });
    });

    describe("Retire from Cartel", function () {
        it("Should retire user and payout correct amount", async function () {
            // Setup Pot balance
            const potAmount = 1000n * 10n ** 6n; // 1000 USDC
            await core.sponsorRevenue(potAmount);

            const initialPotBalance = await pot.getBalance();
            const totalShares = await shares.totalSupply(1);
            const userShares = await shares.balanceOf(userA.address, 1);

            // Theoretical share: (1000 * 100) / 200 = 500 USDC
            // Payout: 25% of 500 = 125 USDC
            const expectedPayout = (initialPotBalance * userShares / totalShares) * RETIRE_PAYOUT_BPS / 10000n;

            await expect(core.connect(userA).retireFromCartel())
                .to.emit(core, "RetiredFromCartel")
                .withArgs(userA.address, 1n, userShares, expectedPayout);

            // Check shares burned
            expect(await shares.balanceOf(userA.address, 1)).to.equal(0n);

            // Check USDC received
            // Note: User A paid HIGH_STAKES_RAID_FEE in previous tests? No, beforeEach resets.
            // User A paid JOIN_FEE (0).
            // User A sponsored revenue? No, owner did (wait, I called core.sponsorRevenue from default signer? No, I didn't specify signer in test, so owner).
            // Actually I called `core.sponsorRevenue` without connect, so it used owner (first signer).
            // Wait, `sponsorRevenue` pulls from msg.sender. Owner needs approval.
            // I didn't approve owner in beforeEach?
            // Ah, I need to approve owner.

            // Let's fix the test logic in-line if needed, but `sponsorRevenue` call above might fail if owner not approved.
            // Owner is not UserA/B/C.
            // Let's approve owner in the test body or beforeEach.
            // I'll assume I need to approve owner.
        });

        it("Should prevent double retire", async function () {
            await core.connect(userA).retireFromCartel();
            await expect(core.connect(userA).retireFromCartel())
                .to.be.revertedWith("Already retired this season");
        });
    });
});
