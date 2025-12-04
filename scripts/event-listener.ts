/**
 * Event Listener Service for Base Cartel
 * 
 * This service listens to blockchain events from CartelCore contract
 * and persists player data to maintain leaderboard state.
 * 
 * DEPLOYMENT: Run as a separate process (e.g., Docker container, background job)
 */

import { ethers } from 'ethers';
import CartelCoreABI from '../lib/abi/CartelCore.json';

// Environment configuration
const RPC_URL = process.env.BASE_RPC_URL || 'https://mainnet.base.org';
const CARTEL_CORE_ADDRESS = process.env.NEXT_PUBLIC_CARTEL_CORE_ADDRESS;
const STARTING_BLOCK = Number(process.env.EVENT_LISTENER_START_BLOCK || 0);

// Database interface (would be implemented with Prisma/Drizzle/etc)
interface PlayerRecord {
    address: string;
    shares: number;
    totalClaimed: number;
    raidCount: number;
    joinedAt: Date;
    lastActive: Date;
}

// Mock database operations
class Database {
    async upsertPlayer(data: Partial<PlayerRecord> & { address: string }) {
        // In production: await db.player.upsert({ where: { address }, update: ..., create: ... })
        console.log('[DB] Upsert player:', data);
    }

    async updateShares(address: string, delta: number) {
        // In production: await db.player.update({ where: { address }, data: { shares: { increment: delta } } })
        console.log('[DB] Update shares:', address, delta);
    }

    async incrementRaidCount(address: string) {
        // In production: await db.player.update({ where: { address }, data: { raidCount: { increment: 1 } } })
        console.log('[DB] Increment raid count:', address);
    }

    async updateLastActive(address: string) {
        // In production: await db.player.update({ where: { address }, data: { lastActive: new Date() } })
        console.log('[DB] Update last active:', address);
    }
}

const db = new Database();

class EventListener {
    private provider: ethers.Provider;
    private contract: ethers.Contract;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(RPC_URL);
        this.contract = new ethers.Contract(
            CARTEL_CORE_ADDRESS!,
            CartelCoreABI,
            this.provider
        );
    }

    async start() {
        console.log('[EventListener] Starting...');
        console.log('[EventListener] Connected to:', RPC_URL);
        console.log('[EventListener] Contract:', CARTEL_CORE_ADDRESS);

        // Subscribe to Join events
        this.contract.on('Join', async (player, referrer, shares, fee, event) => {
            console.log('[Event] Join:', { player, referrer, shares: shares.toString(), fee: fee.toString() });

            await db.upsertPlayer({
                address: player,
                shares: Number(shares),
                totalClaimed: 0,
                raidCount: 0,
                joinedAt: new Date(),
                lastActive: new Date(),
            });

            // If referred, update referrer's stats
            if (referrer !== ethers.ZeroAddress) {
                await db.updateLastActive(referrer);
            }
        });

        // Subscribe to Raid events
        this.contract.on('Raid', async (raider, target, amountStolen, success, fee, event) => {
            console.log('[Event] Raid:', { raider, target, amountStolen: amountStolen.toString(), success });

            await db.incrementRaidCount(raider);
            await db.updateLastActive(raider);

            if (success && amountStolen > 0) {
                await db.updateShares(raider, Number(amountStolen));
                await db.updateShares(target, -Number(amountStolen));
            }
        });

        // Subscribe to Betrayal events
        this.contract.on('Betrayal', async (traitor, amountStolen, event) => {
            console.log('[Event] Betrayal:', { traitor, amountStolen: amountStolen.toString() });

            // Remove player from active leaderboard or mark as betrayed
            await db.updateShares(traitor, 0); // Burn all shares
            await db.updateLastActive(traitor);
        });

        console.log('[EventListener] Listening for events...');

        // Optionally, sync historical events
        if (STARTING_BLOCK > 0) {
            await this.syncHistoricalEvents(STARTING_BLOCK);
        }
    }

    async syncHistoricalEvents(fromBlock: number) {
        console.log('[EventListener] Syncing historical events from block:', fromBlock);

        const currentBlock = await this.provider.getBlockNumber();
        const filter = this.contract.filters;

        // Query past events in batches
        const BATCH_SIZE = 1000;
        for (let i = fromBlock; i < currentBlock; i += BATCH_SIZE) {
            const toBlock = Math.min(i + BATCH_SIZE - 1, currentBlock);

            const joinEvents = await this.contract.queryFilter(filter.Join(), i, toBlock);
            const raidEvents = await this.contract.queryFilter(filter.Raid(), i, toBlock);
            const betrayalEvents = await this.contract.queryFilter(filter.Betrayal(), i, toBlock);

            console.log(`[EventListener] Processed blocks ${i}-${toBlock}: ${joinEvents.length} joins, ${raidEvents.length} raids, ${betrayalEvents.length} betrayals`);

            // Process events in order
            // ... (implementation details)
        }

        console.log('[EventListener] Historical sync complete');
    }

    stop() {
        this.contract.removeAllListeners();
        console.log('[EventListener] Stopped');
    }
}

// Main execution
if (require.main === module) {
    const listener = new EventListener();
    listener.start().catch(console.error);

    // Graceful shutdown
    process.on('SIGINT', () => {
        listener.stop();
        process.exit(0);
    });
}

export default EventListener;

