const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CartelCore Join Logic", function () {
    let Core, Pot, Shares, MockUSDC;
    let core, pot, shares, usdc;
    let owner, user1, user2, referrer;

    const JOIN_FEE = 0n; // Default in contract is 0
    const JOIN_SHARES = 100n;
    const REFERRAL_BONUS = 20n;
    const INITIAL_INVITES = 3n;

    beforeEach(async function () {
        [owner, user1, user2, referrer] = await ethers.getSigners();

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
    });

    it("Case A: New user joins with no referrer while inviteOnly == false", async function () {
        // Disable inviteOnly
        await core.setInviteOnly(false);

        ```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CartelCore Join Logic", function () {
    let Core, Pot, Shares, MockUSDC;
    let core, pot, shares, usdc;
    let owner, user1, user2, referrer;

    const JOIN_FEE = 0n; // Default in contract is 0
    const JOIN_SHARES = 100n;
    const REFERRAL_BONUS = 20n;
    const INITIAL_INVITES = 3n;

    beforeEach(async function () {
        [owner, user1, user2, referrer] = await ethers.getSigners();

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
    });

    it("Case A: New user joins with no referrer while inviteOnly == false", async function () {
        // Disable inviteOnly
        await core.setInviteOnly(false);

        // User1 joins
        await core.connect(user1).join(ethers.ZeroAddress);

        // Check shares
        expect(await shares.balanceOf(user1.address, 1)).to.equal(JOIN_SHARES);

        // Check seasonParticipation
        const currentSeason = await core.currentSeason();
        expect(await core.seasonParticipation(user1.address, currentSeason)).to.be.true;
    });

    it("Case B: Same user trying to join again in same season", async function () {
        await core.setInviteOnly(false);
        await core.connect(user1).join(ethers.ZeroAddress);

        await expect(
            core.connect(user1).join(ethers.ZeroAddress)
        ).to.be.revertedWith("Already joined");
    });

    it("Case C: inviteOnly == true and user tries to join with referrer = address(0)", async function () {
        // inviteOnly is true by default
        await expect(
            core.connect(user1).join(ethers.ZeroAddress)
        ).to.be.revertedWith("Referrer required in invite-only mode");
    });

    it("Case D: inviteOnly == true, referrer has invites", async function () {
        // Setup referrer
        // Owner has infinite invites, but let's give 'referrer' some invites
        await core.grantInvites(referrer.address, 1);

        const initialReferrerInvites = await core.invites(referrer.address);
        expect(initialReferrerInvites).to.equal(1n);

        // User1 joins with referrer
        await core.connect(user1).join(referrer.address);

        // Check invites decremented
        expect(await core.invites(referrer.address)).to.equal(0n);

        // Check referredBy
        expect(await core.referredBy(user1.address)).to.equal(referrer.address);

        // Check referralCount
        expect(await core.referralCount(referrer.address)).to.equal(1n);

        // Check user shares
        expect(await shares.balanceOf(user1.address, 1)).to.equal(JOIN_SHARES);
        
        // Check referrer bonus (Should be 0 now as we removed on-chain bonus)
        expect(await shares.balanceOf(referrer.address, 1)).to.equal(0n);
    });
});
