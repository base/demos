const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentVault Logic", function () {
    let Core, Pot, Shares, MockUSDC, AgentVault;
    let core, pot, shares, usdc, vault;
    let owner, user, agent, target;

    const RAID_FEE = 5000n; // 0.005 USDC

    beforeEach(async function () {
        [owner, user, agent, target] = await ethers.getSigners();

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

        // Deploy AgentVault
        AgentVault = await ethers.getContractFactory("AgentVault");
        vault = await AgentVault.deploy(await usdc.getAddress(), await core.getAddress());
        await vault.waitForDeployment();

        // Authorize AgentVault in Core
        await core.setAgent(await vault.getAddress(), true);

        // Mint USDC to user and approve Vault
        await usdc.mint(user.address, 10000n * 10n ** 6n);
        await usdc.connect(user).approve(await vault.getAddress(), ethers.MaxUint256);

        // Deposit into Vault
        await vault.connect(user).deposit(10000n); // Deposit enough for fees
    });

    it("Case A: Unauthorized agent", async function () {
        // Try calling raidFor directly from a non-agent address (e.g., owner)
        // Core checks msg.sender is authorized agent.
        // Owner is NOT an authorized agent (unless set).
        await expect(
            core.connect(owner).raidFor(user.address, target.address)
        ).to.be.revertedWith("Not authorized agent");
    });

    it("Case B: Proper agent raid with signature", async function () {
        // User signs a message authorizing "raid"
        const domain = {
            name: "FarcasterCartelAgent",
            version: "1",
            chainId: (await ethers.provider.getNetwork()).chainId,
            verifyingContract: await vault.getAddress()
        };

        const types = {
            ExecuteAction: [
                { name: "user", type: "address" },
                { name: "action", type: "string" },
                { name: "data", type: "bytes" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" }
            ]
        };

        const action = "raid";
        // ABI encode the target address as 'data'
        const data = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [target.address]);
        const nonce = await vault.nonces(user.address);
        const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour

        const value = {
            user: user.address,
            action: action,
            data: data,
            nonce: nonce,
            deadline: deadline
        };

        const signature = await user.signTypedData(domain, types, value);
        const { v, r, s } = ethers.Signature.from(signature);

        // Execute action via Vault
        // This should succeed:
        // 1. Verify sig
        // 2. Deduct fee from vault balance
        // 3. Call core.raidFor

        // Note: raidFor requires user to have joined? 
        // Logic in Core doesn't explicitly check if 'user' has joined in raidFor, 
        // but _raid might fail if user has no shares or if logic assumes it.
        // Let's make sure user joins first to be safe (though raid logic is just fee + steal).
        // Actually, raider needs to pay fee. Vault pays fee to Core.
        // Core calls pot.depositFrom(msg.sender, ...).
        // msg.sender is Vault.
        // Vault has approved Core (in constructor).
        // Vault needs USDC.
        // Vault has USDC from user deposit? 
        // Wait. Vault.deposit moves USDC from User -> Vault.
        // Vault.executeAction -> checks balances[user] >= fee -> balances[user] -= fee.
        // Then calls core.raidFor.
        // Core._raid -> pot.depositFrom(msg.sender, fee).
        // msg.sender is Vault.
        // So Vault pays the fee to Pot.
        // Does Vault have USDC? Yes, from deposit.

        await expect(vault.executeAction(user.address, action, data, deadline, v, r, s))
            .to.emit(vault, "ActionExecuted")
            .withArgs(user.address, "raid", RAID_FEE);

        // Check user balance in vault decreased
        expect(await vault.balances(user.address)).to.equal(10000n - RAID_FEE);
    });

    it("Case C: Replay protection", async function () {
        const domain = {
            name: "FarcasterCartelAgent",
            version: "1",
            chainId: (await ethers.provider.getNetwork()).chainId,
            verifyingContract: await vault.getAddress()
        };

        const types = {
            ExecuteAction: [
                { name: "user", type: "address" },
                { name: "action", type: "string" },
                { name: "data", type: "bytes" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" }
            ]
        };

        const action = "raid";
        const data = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [target.address]);
        const nonce = await vault.nonces(user.address);
        const deadline = Math.floor(Date.now() / 1000) + 3600;

        const value = {
            user: user.address,
            action: action,
            data: data,
            nonce: nonce,
            deadline: deadline
        };

        const signature = await user.signTypedData(domain, types, value);
        const { v, r, s } = ethers.Signature.from(signature);

        // First execution
        await vault.executeAction(user.address, action, data, deadline, v, r, s);

        // Second execution (replay)
        await expect(
            vault.executeAction(user.address, action, data, deadline, v, r, s)
        ).to.be.revertedWith("Invalid signature"); // Nonce mismatch causes signature recovery to fail or mismatch
    });
});
