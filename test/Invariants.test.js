const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Cartel Invariants & Security Checks", function () {
    let Core, Shares, Pot, Vault, MockERC20;
    let core, shares, pot, vault, usdc;
    let owner, user1, user2, user3, agent, attacker;

    // Tracking variables for invariants
    let totalFeesCollected = 0n;
    let totalSponsorRevenue = 0n;
    let totalClaims = 0n;
    let totalRetirePayouts = 0n;

    // Constants
    const JOIN_FEE = 0n;
    const RAID_FEE = 5000n;
    const HIGH_STAKES_RAID_FEE = 15000n;
    const INITIAL_MINT = 1000000n * 10n ** 6n; // 1M USDC

    beforeEach(async function () {
        [owner, user1, user2, user3, agent, attacker] = await ethers.getSigners();

        // Deploy Mock USDC
        MockERC20 = await ethers.getContractFactory("MockERC20");
        usdc = await MockERC20.deploy("USDC", "USDC");
        await usdc.waitForDeployment();

        // Deploy Contracts
        Shares = await ethers.getContractFactory("CartelShares");
        shares = await Shares.deploy();
        await shares.waitForDeployment();

        Pot = await ethers.getContractFactory("CartelPot");
        pot = await Pot.deploy(await usdc.getAddress());
        await pot.waitForDeployment();

        Core = await ethers.getContractFactory("CartelCore");
        core = await Core.deploy(await shares.getAddress(), await pot.getAddress(), await usdc.getAddress());
        await core.waitForDeployment();

        Vault = await ethers.getContractFactory("AgentVault");
        vault = await Vault.deploy(await usdc.getAddress(), await core.getAddress());
        await vault.waitForDeployment();

        // Setup Permissions
        await shares.setMinter(await core.getAddress());
        await pot.setCore(await core.getAddress());
        await core.setAgent(await vault.getAddress(), true);
        await core.setAgent(agent.address, true); // Whitelist agent signer

        // Distribute USDC
        await usdc.mint(user1.address, INITIAL_MINT);
        await usdc.mint(user2.address, INITIAL_MINT);
        await usdc.mint(user3.address, INITIAL_MINT);
        await usdc.mint(attacker.address, INITIAL_MINT);
        await usdc.mint(owner.address, INITIAL_MINT);

        // Approve USDC
        await usdc.connect(user1).approve(await pot.getAddress(), ethers.MaxUint256);
        await usdc.connect(user2).approve(await pot.getAddress(), ethers.MaxUint256);
        await usdc.connect(user3).approve(await pot.getAddress(), ethers.MaxUint256);
        await usdc.connect(attacker).approve(await pot.getAddress(), ethers.MaxUint256);
        await usdc.connect(owner).approve(await pot.getAddress(), ethers.MaxUint256);

        // Also approve Core (for sponsorRevenue)
        await usdc.connect(owner).approve(await core.getAddress(), ethers.MaxUint256);

        // Reset trackers
        totalFeesCollected = 0n;
        totalSponsorRevenue = 0n;
        totalClaims = 0n;
        totalRetirePayouts = 0n;
    });

    it("Should maintain invariants over random sequence of actions", async function () {
        const users = [user1, user2, user3];
        const actions = 50; // Number of random actions

        for (let i = 0; i < actions; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const actionType = Math.floor(Math.random() * 6); // 0-5

            // Check if user is joined
            const userShares = await shares.balanceOf(user.address, 1);
            const isJoined = userShares > 0n;

            try {
                if (actionType === 0) { // JOIN
                    if (!isJoined) {
                        // console.log(`Action ${i}: ${user.address} Joining`);
                        await core.connect(user).join(ethers.ZeroAddress);
                        totalFeesCollected += JOIN_FEE;
                    }
                }
                else if (actionType === 1) { // RAID
                    if (isJoined) {
                        // Pick random target
                        const target = users[Math.floor(Math.random() * users.length)];
                        if (target.address !== user.address && (await shares.balanceOf(target.address, 1)) > 0n) {
                            // console.log(`Action ${i}: ${user.address} Raiding ${target.address}`);
                            await core.connect(user).raid(target.address);
                            totalFeesCollected += RAID_FEE;
                        }
                    }
                }
                else if (actionType === 2) { // HIGH STAKES RAID
                    if (isJoined) {
                        const target = users[Math.floor(Math.random() * users.length)];
                        if (target.address !== user.address && (await shares.balanceOf(target.address, 1)) > 0n) {
                            // console.log(`Action ${i}: ${user.address} High Stakes Raiding ${target.address}`);
                            await core.connect(user).highStakesRaid(target.address);
                            totalFeesCollected += HIGH_STAKES_RAID_FEE;
                        }
                    }
                }
                else if (actionType === 3) { // CLAIM PROFIT
                    if (isJoined) {
                        // Distribute profits first sometimes
                        if (Math.random() > 0.5) {
                            try {
                                await core.distributeDailyProfits();
                            } catch (e) {
                                // Ignore "Too soon" or "No revenue"
                            }
                        }

                        const pending = await core.getPendingProfit(user.address);
                        if (pending > 0n) {
                            // console.log(`Action ${i}: ${user.address} Claiming ${pending}`);
                            await core.connect(user).claimProfit();
                            totalClaims += pending;
                        }
                    }
                }
                else if (actionType === 4) { // RETIRE
                    // Only retire rarely (10% chance) to keep game going
                    if (isJoined && Math.random() < 0.1) {
                        // console.log(`Action ${i}: ${user.address} Retiring`);

                        // Calculate expected payout roughly to track
                        // But exact calculation depends on state at that moment.
                        // We can capture the balance change.
                        const balanceBefore = await usdc.balanceOf(user.address);
                        await core.connect(user).retireFromCartel();
                        const balanceAfter = await usdc.balanceOf(user.address);
                        totalRetirePayouts += (balanceAfter - balanceBefore);
                    }
                }
                else if (actionType === 5) { // SPONSOR REVENUE
                    const amount = 1000n;
                    // console.log(`Action ${i}: Sponsor ${amount}`);
                    await core.connect(owner).sponsorRevenue(amount);
                    totalSponsorRevenue += amount;
                }

            } catch (error) {
                // console.log(`Action ${i} Failed: ${error.message}`);
                // Some failures are expected (e.g. cooldowns, insufficient funds, etc.)
                // But we should ensure invariants hold regardless.
            }

            // --- INVARIANT CHECKS ---

            // 1. Pot Balance Invariant
            const potBalance = await usdc.balanceOf(await pot.getAddress());
            const expectedPotBalance = totalFeesCollected + totalSponsorRevenue - totalClaims - totalRetirePayouts;

            // Note: There might be small dust errors due to integer division in profit sharing?
            // Actually, profit sharing just moves internal counters. 
            // `dailyRevenuePool` holds undistributed fees.
            // `potBalance` holds ALL fees + sponsor revenue - withdrawals.
            // So checking potBalance vs (Inputs - Outputs) is the ultimate check.

            expect(potBalance).to.equal(expectedPotBalance, `Pot Balance Invariant Failed at step ${i}`);

            // 2. Shares Supply Invariant
            const totalSupply = await shares.totalSupply(1);
            let sumBalances = 0n;
            for (const u of users) {
                sumBalances += await shares.balanceOf(u.address, 1);
            }
            expect(totalSupply).to.equal(sumBalances, `Shares Supply Invariant Failed at step ${i}`);
        }
    });

    it("Should enforce strict delegation safety", async function () {
        // 1. Unauthorized raidFor
        await expect(
            core.connect(attacker).raidFor(user1.address, user2.address)
        ).to.be.revertedWithCustomError(core, "OwnableUnauthorizedAccount") // Wait, it's onlyAgent, not Ownable
            .catch(async (e) => {
                // Fallback if custom error name differs or is generic
                // The modifier is `onlyAgent` which requires `authorizedAgents[msg.sender]`.
                // It usually reverts with "Not authorized agent" string if require is used, 
                // or Panic if index out of bounds? No, mapping returns false.
                // Let's check the modifier implementation in CartelCore.sol
                // require(authorizedAgents[msg.sender], "Not authorized agent");
                await expect(core.connect(attacker).raidFor(user1.address, user2.address)).to.be.revertedWith("Not authorized agent");
            });

        // 2. Unauthorized claimProfitFor
        await expect(
            core.connect(attacker).claimProfitFor(user1.address)
        ).to.be.revertedWith("Not authorized agent");

        // 3. Unauthorized highStakesRaidFor
        await expect(
            core.connect(attacker).highStakesRaidFor(user1.address, user2.address)
        ).to.be.revertedWith("Not authorized agent");

        // 4. Unauthorized retireFromCartelFor
        await expect(
            core.connect(attacker).retireFromCartelFor(user1.address)
        ).to.be.revertedWith("Not authorized agent");
    });
});
