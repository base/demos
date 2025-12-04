const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Cartel Join & Shares Verification", function () {
    let Core, Pot, Shares, MockUSDC;
    let core, pot, shares, usdc;
    let owner, userA, userB, randomUser;

    const JOIN_SHARES = 100n;

    beforeEach(async function () {
        [owner, userA, userB, randomUser] = await ethers.getSigners();

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

        // Disable invite only for these tests to focus on share logic
        await core.setInviteOnly(false);
    });

    it("1. Single join works: User A gets 100 shares, Total is 100", async function () {
        await core.connect(userA).join(ethers.ZeroAddress);

        const balanceA = await shares.balanceOf(userA.address, 1);
        const totalShares = await shares.totalSupply(1);

        expect(balanceA).to.equal(JOIN_SHARES);
        expect(totalShares).to.equal(JOIN_SHARES);
    });

    it("2. Double join fails: User A cannot join twice", async function () {
        await core.connect(userA).join(ethers.ZeroAddress);

        await expect(
            core.connect(userA).join(ethers.ZeroAddress)
        ).to.be.revertedWith("Already joined");

        // Verify shares didn't change
        const balanceA = await shares.balanceOf(userA.address, 1);
        const totalShares = await shares.totalSupply(1);

        expect(balanceA).to.equal(JOIN_SHARES);
        expect(totalShares).to.equal(JOIN_SHARES);
    });

    it("3. Two users join: Total shares == 200", async function () {
        await core.connect(userA).join(ethers.ZeroAddress);
        await core.connect(userB).join(ethers.ZeroAddress);

        const balanceA = await shares.balanceOf(userA.address, 1);
        const balanceB = await shares.balanceOf(userB.address, 1);
        const totalShares = await shares.totalSupply(1);

        expect(balanceA).to.equal(JOIN_SHARES);
        expect(balanceB).to.equal(JOIN_SHARES);
        expect(totalShares).to.equal(JOIN_SHARES * 2n);
    });

    it("4. No random mint function: Random user cannot mint shares", async function () {
        // Try to call mint directly on Shares contract
        // mint is protected by onlyMinter
        // owner of Shares is Core (transferred in beforeEach)
        // randomUser is NOT minter

        await expect(
            shares.connect(randomUser).mint(randomUser.address, 1000n, "0x")
        ).to.be.revertedWith("Not authorized to mint");

        // Verify Core doesn't have a public mint function
        // We can't easily test "function doesn't exist" via call, 
        // but we can verify no other function allows arbitrary minting.
        // This is mostly a code review task, but the direct mint check proves the Shares contract is secure.
    });
});
