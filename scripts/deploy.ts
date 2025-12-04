import { ethers } from "hardhat";

async function main() {
    console.log("🚀 Starting deployment to Base Sepolia...\n");

    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying contracts with account:", deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

    // Deploy CartelShares (ERC-1155)
    console.log("📦 Deploying CartelShares...");
    const CartelShares = await ethers.getContractFactory("CartelShares");
    const shares = await CartelShares.deploy();
    await shares.waitForDeployment();
    const sharesAddress = await shares.getAddress();
    console.log("✅ CartelShares deployed to:", sharesAddress, "\n");

    // Deploy CartelPot (Treasury)
    console.log("📦 Deploying CartelPot...");
    const CartelPot = await ethers.getContractFactory("CartelPot");
    const usdcAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // Base Sepolia USDC
    const pot = await CartelPot.deploy(usdcAddress);
    await pot.waitForDeployment();
    const potAddress = await pot.getAddress();
    console.log("✅ CartelPot deployed to:", potAddress, "\n");

    // Deploy CartelCore (Main game logic)
    console.log("📦 Deploying CartelCore...");
    const CartelCore = await ethers.getContractFactory("CartelCore");
    const core = await CartelCore.deploy(sharesAddress, potAddress, usdcAddress);
    await core.waitForDeployment();
    const coreAddress = await core.getAddress();
    console.log("✅ CartelCore deployed to:", coreAddress, "\n");

    // Grant permissions
    console.log("🔐 Setting up permissions...");

    // 1. Allow Core to mint shares
    await shares.setMinter(coreAddress);
    console.log("✅ CartelCore set as minter for Shares");

    // 2. Allow Core to control the Pot
    await pot.setCore(coreAddress);
    console.log("✅ CartelCore set as controller for Pot");

    // 3. Verify Owner Invites
    console.log("✅ Owner initialized with INFINITE invites (Phase 1: Invite-Only Mode)\n");

    // Summary
    console.log("=".repeat(60));
    console.log("🎉 DEPLOYMENT SUCCESSFUL!");
    console.log("=".repeat(60));
    console.log("\n📋 CONTRACT ADDRESSES:\n");
    console.log("CartelCore:", coreAddress);
    console.log("CartelPot:", potAddress);
    console.log("CartelShares:", sharesAddress);
    console.log("\n📝 NEXT STEPS:");
    console.log("1. Save these addresses to your .env.local file");
    console.log("2. Verify contracts on BaseScan");
    console.log("3. Update src/lib/basePay.ts with contract addresses");
    console.log("\n🔍 View on BaseScan:");
    console.log(`https://sepolia.basescan.org/address/${coreAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
