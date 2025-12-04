const hre = require("hardhat");

async function main() {
    const [owner, userA, userB, userC, userD] = await hre.ethers.getSigners();
    console.log("Deploying with owner:", owner.address);

    // 1. Deploy Mock USDC
    const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
    const usdc = await MockERC20.deploy("USDC", "USDC");
    await usdc.waitForDeployment();
    const usdcAddress = await usdc.getAddress();
    console.log("USDC deployed to:", usdcAddress);

    // 2. Deploy Shares
    const CartelShares = await hre.ethers.getContractFactory("CartelShares");
    const shares = await CartelShares.deploy();
    await shares.waitForDeployment();
    const sharesAddress = await shares.getAddress();
    console.log("Shares deployed to:", sharesAddress);

    // 3. Deploy Pot
    const CartelPot = await hre.ethers.getContractFactory("CartelPot");
    const pot = await CartelPot.deploy(usdcAddress);
    await pot.waitForDeployment();
    const potAddress = await pot.getAddress();
    console.log("Pot deployed to:", potAddress);

    // 4. Deploy Core
    const CartelCore = await hre.ethers.getContractFactory("CartelCore");
    const core = await CartelCore.deploy(sharesAddress, potAddress, usdcAddress);
    await core.waitForDeployment();
    const coreAddress = await core.getAddress();
    console.log("Core deployed to:", coreAddress);

    // 5. Setup Permissions
    await shares.setMinter(coreAddress, true);
    await pot.transferOwnership(coreAddress);
    console.log("Permissions set.");

    // 6. Fund Users
    const amount = hre.ethers.parseUnits("10000", 18);
    await usdc.mint(userA.address, amount);
    await usdc.mint(userB.address, amount);
    await usdc.mint(userC.address, amount);
    await usdc.mint(userD.address, amount);

    await usdc.connect(userA).approve(coreAddress, hre.ethers.MaxUint256);
    await usdc.connect(userB).approve(coreAddress, hre.ethers.MaxUint256);
    await usdc.connect(userC).approve(coreAddress, hre.ethers.MaxUint256);
    await usdc.connect(userD).approve(coreAddress, hre.ethers.MaxUint256);
    console.log("Users funded and approved.");

    // 7. Interactions
    // A joins (referred by owner)
    await core.connect(userA).join(owner.address);
    console.log("A joined.");

    // A invites B
    await core.connect(userB).join(userA.address);
    console.log("B joined (referred by A).");

    // A invites C
    await core.connect(userC).join(userA.address);
    console.log("C joined (referred by A).");

    // B invites D
    await core.connect(userD).join(userB.address);
    console.log("D joined (referred by B).");

    // Raids
    // A raids C (3 times)
    await core.connect(userA).raid(userC.address);
    await core.connect(userA).raid(userC.address);
    await core.connect(userA).raid(userC.address);
    console.log("A raided C 3 times.");

    // B high stakes raid C
    await core.connect(userB).highStakesRaid(userC.address);
    console.log("B high-stakes raided C.");

    // C raids A
    await core.connect(userC).raid(userA.address);
    console.log("C raided A.");

    console.log("Seed complete.");
    console.log("User A:", userA.address);
    console.log("User B:", userB.address);
    console.log("User C:", userC.address);
    console.log("User D:", userD.address);
    console.log("------------------------------------------------");
    console.log("UPDATE src/lib/basePay.ts WITH THESE ADDRESSES:");
    console.log("USDC_ADDRESS =", usdcAddress);
    console.log("CARTEL_CORE_ADDRESS =", coreAddress);
    console.log("CARTEL_POT_ADDRESS =", potAddress);
    console.log("CARTEL_SHARES_ADDRESS =", sharesAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
