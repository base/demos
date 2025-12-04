/**
 * Zora NFT Minting Script for Seasonal Badges
 * 
 * Mints NFT badges for top performers at the end of each season
 * on Zora Protocol (Base chain)
 */

import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Zora Protocol addresses on Base
const ZORA_CREATOR_1155 = '0x777777C338d93e2C7adf08D102d45CA7CC4Ed021'; // Zora 1155 Factory
const ZORA_PROTOCOL_REWARDS = '0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B';

// Configuration
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const ROYALTY_RECEIVER = process.env.NEXT_PUBLIC_CARTEL_POT_ADDRESS;
const ROYALTY_BPS = 250; // 2.5%
const RPC_URL = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

interface BadgeMetadata {
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string | number }>;
}

interface MintRecipient {
    address: string;
    rank: number;
    shares: number;
}

class ZoraMinter {
    private publicClient;
    private walletClient;
    private account;

    constructor() {
        if (!DEPLOYER_PRIVATE_KEY) {
            throw new Error('DEPLOYER_PRIVATE_KEY not set');
        }

        this.account = privateKeyToAccount(DEPLOYER_PRIVATE_KEY as `0x${string}`);

        this.publicClient = createPublicClient({
            chain: base,
            transport: http(RPC_URL),
        });

        this.walletClient = createWalletClient({
            account: this.account,
            chain: base,
            transport: http(RPC_URL),
        });
    }

    /**
     * Create a new Zora 1155 NFT collection for a season
     */
    async createCollection(seasonNumber: number) {
        const contractURI = `${process.env.NEXT_PUBLIC_URL}/api/metadata/season/${seasonNumber}/collection.json`;

        console.log(`[Zora] Creating collection for Season ${seasonNumber}`);

        // In production, use Zora SDK:
        // import { createCreator1155 } from '@zoralabs/protocol-sdk';

        // Mock implementation - shows structure
        const collectionAddress = '0x' + '1'.repeat(40); // Placeholder

        console.log(`[Zora] Collection created: ${collectionAddress}`);
        console.log(`[Zora] Contract URI: ${contractURI}`);

        return {
            collectionAddress,
            contractURI,
            txHash: '0xabc123...',
        };
    }

    /**
     * Mint badge to a single recipient
     */
    async mintBadge(
        collectionAddress: string,
        tokenId: number,
        recipient: string,
        quantity: number = 1
    ) {
        console.log(`[Zora] Minting token ${tokenId} to ${recipient}`);

        // Mock mint - in production use Zora protocol contracts
        const txHash = '0xmint' + Math.random().toString(36).substring(7);

        console.log(`[Zora] Minted! TxHash: ${txHash}`);

        return {
            txHash,
            tokenId,
            recipient,
            quantity,
        };
    }

    /**
     * Batch mint badges to multiple recipients
     */
    async batchMint(
        seasonNumber: number,
        recipients: MintRecipient[]
    ) {
        console.log(`[Zora] Batch minting ${recipients.length} badges for Season ${seasonNumber}`);

        // Create collection first
        const { collectionAddress } = await this.createCollection(seasonNumber);

        const results = [];

        for (const recipient of recipients) {
            // Generate metadata
            const metadata = this.generateBadgeMetadata(seasonNumber, recipient);

            // Upload metadata (would use IPFS/Arweave in production)
            const metadataURI = await this.uploadMetadata(seasonNumber, recipient.rank, metadata);

            // Mint NFT
            const result = await this.mintBadge(
                collectionAddress,
                recipient.rank, // Token ID = rank
                recipient.address,
                1
            );

            results.push({
                ...result,
                metadataURI,
                rank: recipient.rank,
            });

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log(`[Zora] Batch mint complete: ${results.length} badges minted`);

        return {
            collectionAddress,
            results,
            totalMinted: results.length,
        };
    }

    /**
     * Generate badge metadata based on rank
     */
    generateBadgeMetadata(seasonNumber: number, recipient: MintRecipient): BadgeMetadata {
        const tier = this.getRankTier(recipient.rank);

        return {
            name: `Base Cartel - Season ${seasonNumber} - Rank #${recipient.rank}`,
            description: `This badge certifies that the holder achieved Rank #${recipient.rank} in Base Cartel Season ${seasonNumber}. ${tier.description}`,
            image: `${process.env.NEXT_PUBLIC_URL}/api/metadata/season/${seasonNumber}/badge/${recipient.rank}.png`,
            attributes: [
                { trait_type: 'Season', value: seasonNumber },
                { trait_type: 'Rank', value: recipient.rank },
                { trait_type: 'Tier', value: tier.name },
                { trait_type: 'Shares', value: recipient.shares },
                { trait_type: 'Badge Type', value: 'Seasonal Leaderboard' },
            ],
        };
    }

    /**
     * Determine rank tier for badge styling
     */
    getRankTier(rank: number): { name: string; description: string; color: string } {
        if (rank === 1) {
            return {
                name: 'Kingpin',
                description: 'The undisputed ruler of the cartel.',
                color: '#FFD700', // Gold
            };
        } else if (rank <= 3) {
            return {
                name: 'Underboss',
                description: 'Among the elite leadership of the cartel.',
                color: '#C0C0C0', // Silver
            };
        } else if (rank <= 10) {
            return {
                name: 'Capo',
                description: 'A respected lieutenant in the organization.',
                color: '#CD7F32', // Bronze
            };
        } else if (rank <= 50) {
            return {
                name: 'Soldier',
                description: 'A proven member of the cartel.',
                color: '#4169E1', // Royal Blue
            };
        } else {
            return {
                name: 'Associate',
                description: 'A recognized contributor to the cartel.',
                color: '#8B7355', // Brown
            };
        }
    }

    /**
     * Upload metadata to storage (IPFS/Arweave)
     */
    async uploadMetadata(seasonNumber: number, rank: number, metadata: BadgeMetadata): Promise<string> {
        // In production, upload to IPFS via Pinata/NFT.Storage or Arweave
        const metadataURI = `${process.env.NEXT_PUBLIC_URL}/api/metadata/season/${seasonNumber}/badge/${rank}.json`;

        console.log(`[Metadata] Uploaded to: ${metadataURI}`);

        return metadataURI;
    }

    /**
     * Set royalty configuration (2.5% to CartelPot)
     */
    async setRoyalties(collectionAddress: string) {
        console.log(`[Zora] Setting royalties for ${collectionAddress}`);
        console.log(`[Zora] Royalty BPS: ${ROYALTY_BPS} (2.5%)`);
        console.log(`[Zora] Royalty Receiver: ${ROYALTY_RECEIVER}`);

        // In production, call Zora royalty functions
        // const hash = await contract.write.setDefaultRoyalty([ROYALTY_RECEIVER, ROYALTY_BPS]);

        return {
            royaltyBPS: ROYALTY_BPS,
            royaltyReceiver: ROYALTY_RECEIVER,
            txHash: '0xroyalty' + Math.random().toString(36).substring(7),
        };
    }
}

// CLI usage
if (require.main === module) {
    const seasonNumber = parseInt(process.argv[2] || '1');
    const topCount = parseInt(process.argv[3] || '500');

    const minter = new ZoraMinter();

    // Sample recipients (in production, query from database)
    const recipients: MintRecipient[] = [
        { address: '0x1234567890123456789012345678901234567890', rank: 1, shares: 2450 },
        { address: '0x2345678901234567890123456789012345678901', rank: 2, shares: 1890 },
        { address: '0x3456789012345678901234567890123456789012', rank: 3, shares: 1420 },
        // ... would load top 500 from database
    ];

    minter.batchMint(seasonNumber, recipients.slice(0, topCount))
        .then(result => {
            console.log('[Success] Season badges minted:', result);
            process.exit(0);
        })
        .catch(error => {
            console.error('[Error] Minting failed:', error);
            process.exit(1);
        });
}

export default ZoraMinter;

