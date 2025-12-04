const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Cartel Referral Logic Verification", function () {
    let Core, Pot, Shares, MockUSDC;
    let core, pot, shares, usdc;
    let owner, userA, userB, userC;

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

        // Disable invite only for easier testing (or use invites if needed)
        // To test referrals, we don't strictly need invite-only mode ON, 
        // but we do need to pass a referrer address to join().
        await core.setInviteOnly(false);
    });

    it("1. Referrer set at join: B joins with A as referrer", async function () {
        // A joins first (so they can be a referrer, though contract doesn't strictly enforce referrer must have joined, 
        // usually it's good practice. Logic: if (referrer != 0 && referrer != msg.sender) set it.
        await core.connect(userA).join(ethers.ZeroAddress);

        // B joins with A as referrer
        await core.connect(userB).join(userA.address);

        // Check storage
        const storedReferrer = await core.referredBy(userB.address);
        expect(storedReferrer).to.equal(userA.address);

        // Check count
        const countA = await core.referralCount(userA.address);
        expect(countA).to.equal(1n);
    });

    it("2. Referrer cannot be overridden (Double join fails)", async function () {
        // B joins with A
        await core.connect(userB).join(userA.address);

        // B tries to join again with C as referrer
        // Should revert because "Already joined"
        await expect(
            core.connect(userB).join(userC.address)
        ).to.be.revertedWith("Already joined");

        // Verify referrer is still A
        const storedReferrer = await core.referredBy(userB.address);
        expect(storedReferrer).to.equal(userA.address);
    });

    it("3. Self-referral ignored", async function () {
        // A tries to refer self
        await core.connect(userA).join(userA.address);

        // Check storage -> should be 0x0
        const storedReferrer = await core.referredBy(userA.address);
        expect(storedReferrer).to.equal(ethers.ZeroAddress);
    });
});
