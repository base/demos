const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Base Cartel", function () {
    let Core, Pot, Shares, MockUSDC;
    let core, pot, shares, usdc;
    let owner, addr1, addr2;

    const JOIN_FEE = 10n * 10n ** 6n; // 10 USDC
    const RAID_FEE = 5n * 10n ** 6n;  // 5 USDC
    const JOIN_SHARES = 100n;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

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
        await usdc.mint(addr1.address, 1000n * 10n ** 6n);
        await usdc.mint(addr2.address, 1000n * 10n ** 6n);

        // Approve Core to spend USDC
        await usdc.connect(addr1).approve(await core.getAddress(), ethers.MaxUint256);
        await usdc.connect(addr2).approve(await core.getAddress(), ethers.MaxUint256);
    });

    it("Should allow a new user to join and receive 100 shares", async function () {
        await expect(core.connect(addr1).join(ethers.ZeroAddress))
            .to.emit(core, "Join")
    });

    it("Should allow raiding and emit event", async function () {
        await core.connect(addr1).join(ethers.ZeroAddress);

        await expect(core.connect(addr1).raid(addr2.address))
            .to.emit(core, "Raid")
            .withArgs(addr1.address, addr2.address, 0, true, RAID_FEE);

        // Pot should have Join Fee + Raid Fee
        expect(await pot.getBalance()).to.equal(JOIN_FEE + RAID_FEE);
    });

    it("Should emit Betrayal event", async function () {
        await core.connect(addr1).join(ethers.ZeroAddress);

        await expect(core.connect(addr1).betray())
            .to.emit(core, "Betrayal")
            .withArgs(addr1.address, 0);
    });
});

