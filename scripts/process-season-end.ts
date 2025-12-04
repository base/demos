/**
 * End-of-Season Processing Script
 * 
 * 1. Query top 500 players from database
 * 2. Generate badge metadata for each
 * 3. Mint NFTs via Zora
 * 4. Post season recap to Farcaster
 */

import ZoraMinter from './mint-season-badges';
import { neynarService } from '../src/lib/neynar-service';

interface Player {
    address: string;
    rank: number;
    shares: number;
    totalClaimed: number;
    raidCount: number;
}

async function getTop500Players(seasonNumber: number): Promise<Player[]> {
    // In production, query from database
    // const players = await db.query(`
    //   SELECT address, shares, totalClaimed, raidCount
    //   FROM players
    //   WHERE season = $1
    //   ORDER BY shares DESC
    //   LIMIT 500
    // `, [seasonNumber]);

    // Mock data for demonstration
    const players: Player[] = [
        { address: '0x1234...', rank: 1, shares: 2450, totalClaimed: 1220, raidCount: 15 },
        { address: '0x2345...', rank: 2, shares: 1890, totalClaimed: 945, raidCount: 8 },
        { address: '0x3456...', rank: 3, shares: 1420, totalClaimed: 710, raidCount: 12 },
        // ... would include 500 players
    ];

    return players.map((player, index) => ({
        ...player,
        rank: index + 1,
    }));
}

async function processSeasonEnd(seasonNumber: number) {
    console.log(`\n========================================`);
    console.log(`SEASON ${seasonNumber} - END OF SEASON PROCESSING`);
    console.log(`========================================\n`);

    try {
        // Step 1: Get top 500 players
        console.log(`[Step 1/4] Fetching top 500 players...`);
        const top500 = await getTop500Players(seasonNumber);
        console.log(`✓ Loaded ${top500.length} players`);
        console.log(`  Top 3: ${top500.slice(0, 3).map(p => `#${p.rank} ${p.address} (${p.shares} shares)`).join(', ')}`);

        // Step 2: Initialize Zora minter
        console.log(`\n[Step 2/4] Initializing Zora minter...`);
        const minter = new ZoraMinter();
        console.log(`✓ Minter initialized`);

        // Step 3: Mint badges
        console.log(`\n[Step 3/4] Minting season badges...`);
        const mintResult = await minter.batchMint(seasonNumber, top500);
        console.log(`✓ Minted ${mintResult.totalMinted} badges`);
        console.log(`  Collection: ${mintResult.collectionAddress}`);
        console.log(`  Sample badges:`);
        mintResult.results.slice(0, 3).forEach(r => {
            console.log(`    Rank #${r.rank}: ${r.recipient} - ${r.txHash}`);
        });

        // Step 4: Set royalties
        console.log(`\n[Step 3.5/4] Setting royalties...`);
        const royaltyResult = await minter.setRoyalties(mintResult.collectionAddress);
        console.log(`✓ Royalties configured`);
        console.log(`  Rate: ${royaltyResult.royaltyBPS / 100}%`);
        console.log(`  Receiver: ${royaltyResult.royaltyReceiver}`);

        // Step 5: Post recap to Farcaster
        console.log(`\n[Step 4/4] Posting season recap...`);
        await neynarService.postSeasonEvent(seasonNumber, 'end');
        console.log(`✓ Season recap posted to Farcaster`);

        // Summary
        console.log(`\n========================================`);
        console.log(`SEASON ${seasonNumber} - PROCESSING COMPLETE`);
        console.log(`========================================`);
        console.log(`Total Badges Minted: ${mintResult.totalMinted}`);
        console.log(`Collection Address: ${mintResult.collectionAddress}`);
        console.log(`Royalty Rate: ${royaltyResult.royaltyBPS / 100}%`);
        console.log(`Royalty Receiver: ${royaltyResult.royaltyReceiver}`);
        console.log(`\nView collection: https://zora.co/collect/base:${mintResult.collectionAddress}`);

        return {
            success: true,
            seasonNumber,
            playersProcessed: top500.length,
            badgesMinted: mintResult.totalMinted,
            collectionAddress: mintResult.collectionAddress,
        };

    } catch (error) {
        console.error(`\n❌ Season processing failed:`, error);
        throw error;
    }
}

// CLI execution
if (require.main === module) {
    const seasonNumber = parseInt(process.argv[2] || '1');

    console.log(`Starting end-of-season processing for Season ${seasonNumber}...`);

    processSeasonEnd(seasonNumber)
        .then(result => {
            console.log(`\n✅ Season ${seasonNumber} processing complete!`);
            process.exit(0);
        })
        .catch(error => {
            console.error(`\n❌ Failed:`, error.message);
            process.exit(1);
        });
}

export default processSeasonEnd;
