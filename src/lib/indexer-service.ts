import { ethers } from 'ethers';
import prisma from '@/lib/prisma';
import { indexReferral } from './clan-service';

const CARTEL_CORE_ADDRESS = process.env.NEXT_PUBLIC_CARTEL_CORE_ADDRESS || "";
const RPC_URL = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

const CORE_ABI = [
    "event Raid(address indexed attacker, address indexed target, uint256 stolenShares, uint256 feePaid)",
    "event HighStakesRaid(address indexed attacker, address indexed target, uint256 stolenShares, uint256 selfPenaltyShares, uint256 feePaid)",
    "event RetiredFromCartel(address indexed user, uint256 indexed season, uint256 burnedShares, uint256 payout)",
    "event Join(address indexed player, address indexed referrer, uint256 shares, uint256 fee)"
];

export async function indexEvents() {
    if (!CARTEL_CORE_ADDRESS || CARTEL_CORE_ADDRESS === "") {
        console.log("Skipping indexing: No Cartel Core Address");
        return;
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CARTEL_CORE_ADDRESS, CORE_ABI, provider);

    // 1. Get last indexed block
    const lastEvent = await prisma.cartelEvent.findFirst({
        orderBy: { blockNumber: 'desc' }
    });

    const currentBlock = await provider.getBlockNumber();
    const startBlock = lastEvent ? lastEvent.blockNumber + 1 : currentBlock - 1000; // Default to last 1000 blocks if fresh
    const endBlock = Math.min(currentBlock, startBlock + 2000); // Max 2000 blocks per run to avoid timeouts

    if (startBlock > endBlock) return;

    console.log(`Indexing events from ${startBlock} to ${endBlock}...`);

    // 2. Fetch Logs
    const raidFilter = contract.filters.Raid();
    const highStakesFilter = contract.filters.HighStakesRaid();
    const retireFilter = contract.filters.RetiredFromCartel();
    const joinFilter = contract.filters.Join();

    const [raidLogs, highStakesLogs, retireLogs, joinLogs] = await Promise.all([
        contract.queryFilter(raidFilter, startBlock, endBlock),
        contract.queryFilter(highStakesFilter, startBlock, endBlock),
        contract.queryFilter(retireFilter, startBlock, endBlock),
        contract.queryFilter(joinFilter, startBlock, endBlock)
    ]);

    // 3. Process Logs
    const eventsToCreate = [];

    for (const log of raidLogs) {
        if ('args' in log) {
            const block = await log.getBlock();
            eventsToCreate.push({
                txHash: log.transactionHash,
                blockNumber: log.blockNumber,
                timestamp: new Date(block.timestamp * 1000),
                type: 'RAID',
                attacker: log.args[0],
                target: log.args[1],
                stolenShares: Number(log.args[2]),
                feePaid: Number(log.args[3])
            });
        }
    }

    for (const log of highStakesLogs) {
        if ('args' in log) {
            const block = await log.getBlock();
            eventsToCreate.push({
                txHash: log.transactionHash,
                blockNumber: log.blockNumber,
                timestamp: new Date(block.timestamp * 1000),
                type: 'HIGH_STAKES_RAID',
                attacker: log.args[0],
                target: log.args[1],
                stolenShares: Number(log.args[2]),
                selfPenaltyShares: Number(log.args[3]),
                feePaid: Number(log.args[4])
            });
        }
    }

    for (const log of retireLogs) {
        if ('args' in log) {
            const block = await log.getBlock();
            eventsToCreate.push({
                txHash: log.transactionHash,
                blockNumber: log.blockNumber,
                timestamp: new Date(block.timestamp * 1000),
                type: 'RETIRE',
                user: log.args[0],
                payout: Number(log.args[3])
            });
        }
    }

    // Process Join events (Referrals)
    for (const log of joinLogs) {
        if ('args' in log) {
            const player = log.args[0];
            const referrer = log.args[1];

            // Only index if there is a valid referrer
            if (referrer && referrer !== ethers.ZeroAddress && referrer !== player) {
                // We assume season 1 for now, or we could fetch it.
                // Since this is an async background task, we can just use 1.
                try {
                    await indexReferral(player, referrer, 1);
                } catch (err) {
                    console.error(`Failed to index referral for ${player}:`, err);
                }
            }
        }
    }

    // 4. Save to DB (Upsert to avoid duplicates)
    for (const event of eventsToCreate) {
        await prisma.cartelEvent.upsert({
            where: { txHash: event.txHash },
            update: {},
            create: event
        });
    }

    console.log(`Indexed ${eventsToCreate.length} events and processed referrals.`);
}
