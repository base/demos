const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CartelPot Fee Accumulation", function () {
    let Core, Pot, Shares, MockUSDC;
    let core, pot, shares, usdc;
    let owner, userA, userB;

    const RAID_FEE = 5000n; // 0.005 USDC
    const HIGH_STAKES_RAID_FEE = 15000n; // 0.015 USDC

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

        // Mint USDC to users
        await usdc.mint(userA.address, 100000n * 10n ** 6n);
        await usdc.mint(userB.address, 100000n * 10n ** 6n);

        // Approve Core
        await usdc.connect(userA).approve(await core.getAddress(), ethers.MaxUint256);
        await usdc.connect(userB).approve(await core.getAddress(), ethers.MaxUint256);

        // Disable invite only
        await core.setInviteOnly(false);

        // Users join (needed for raiding)
        await core.connect(userA).join(ethers.ZeroAddress);
        await core.connect(userB).join(ethers.ZeroAddress);
    });

    it("1. Pot starts at zero", async function () {
        expect(await pot.getBalance()).to.equal(0n);
    });

    it("2. Raid fee adds to pot", async function () {
        await core.connect(userA).raid(userB.address);
        expect(await pot.getBalance()).to.equal(RAID_FEE);
    });

    it("3. Multiple fees accumulate: 3 Raids + 1 High-Stakes Raid", async function () {
        // 3 Normal Raids
        await core.connect(userA).raid(userB.address);
        await core.connect(userA).raid(userB.address);
        await core.connect(userA).raid(userB.address);

        // 1 High-Stakes Raid
        await core.connect(userA).highStakesRaid(userB.address);

        const expectedTotal = (RAID_FEE * 3n) + HIGH_STAKES_RAID_FEE;

        expect(await pot.getBalance()).to.equal(expectedTotal);
    });

    it("4. Retire decreases pot (Payout)", async function () {
        // First accumulate some funds so there is something to pay out
        await core.connect(userA).highStakesRaid(userB.address); // Adds 15000

        const balanceBeforeRetire = await pot.getBalance();

        // User B retires
        // Payout logic depends on shares/totalShares.
        // We just want to verify Pot decreases.
        await core.connect(userB).retireFromCartel();

        const balanceAfterRetire = await pot.getBalance();

        expect(balanceAfterRetire).to.be.lt(balanceBeforeRetire);
    });
});
