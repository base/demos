/**
 * Neynar API Integration for Auto-Posting Casts
 * 
 * This service automatically posts to Farcaster when specific game events occur:
 * - Raid events
 * - Betrayal events
 * - Season start/end events
 */

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
const NEYNAR_API_URL = 'https://api.neynar.com/v2/farcaster';
const SIGNER_UUID = process.env.NEYNAR_SIGNER_UUID;

interface CastParams {
    text: string;
    embeds?: Array<{ url: string }>;
    channelId?: string;
}

class NeynarService {
    private apiKey: string;
    private signerUuid: string;

    constructor() {
        if (!NEYNAR_API_KEY) {
            console.warn('[Neynar] API Key not configured. Notifications will be disabled.');
        }
        if (!SIGNER_UUID) {
            console.warn('[Neynar] Signer UUID not configured. Notifications will be disabled.');
        }
        this.apiKey = NEYNAR_API_KEY || '';
        this.signerUuid = SIGNER_UUID || '';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async postCast(params: CastParams): Promise<any> {
        if (!this.apiKey || !this.signerUuid) {
            console.log('[Neynar] Skipping cast (credentials missing):', params.text);
            return { success: false, skipped: true };
        }

        try {
            const response = await fetch(`${NEYNAR_API_URL}/cast`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api_key': this.apiKey,
                },
                body: JSON.stringify({
                    signer_uuid: this.signerUuid,
                    text: params.text,
                    embeds: params.embeds,
                    channel_id: params.channelId || 'farcaster-cartel',
                }),
            });

            if (!response.ok) {
                throw new Error(`Neynar API error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('[Neynar] Cast posted:', data.cast.hash);
            return data;
        } catch (error) {
            console.error('[Neynar] Failed to post cast:', error);
            // Don't throw, just log error to prevent app crash
            return { success: false, error };
        }
    }

    // Raid event auto-post
    async postRaidEvent(raider: string, target: string, amountStolen: number, success: boolean) {
        const castText = success
            ? `⚔️ RAID SUCCESSFUL!\n\n${raider} just raided ${target} and stole ${amountStolen} shares!\n\nThe cartel grows stronger. 💪\n\n#FarcasterCartel`
            : `⚔️ Raid attempted by ${raider} on ${target} but failed!\n\nBetter luck next time. 🎲\n\n#FarcasterCartel`;

        return this.postCast({
            text: castText,
            embeds: [{ url: `${process.env.NEXT_PUBLIC_URL}?action=raid` }],
        });
    }

    // Betrayal event auto-post
    async postBetrayalEvent(traitor: string, amountStolen: number) {
        const castText = `🩸 BETRAYAL!\n\n${traitor} has betrayed the cartel and walked away with ${amountStolen} USDC!\n\nTrust no one. 🗡️\n\n#FarcasterCartel #Betrayal`;

        return this.postCast({
            text: castText,
            embeds: [{ url: `${process.env.NEXT_PUBLIC_URL}` }],
        });
    }

    // Season event auto-post
    async postSeasonEvent(seasonNumber: number, type: 'start' | 'end') {
        const castText = type === 'start'
            ? `🎭 SEASON ${seasonNumber} HAS BEGUN!\n\nA new era starts today. Join the cartel and climb the ranks.\n\nWho will be the kingpin? 👑\n\n#FarcasterCartel #Season${seasonNumber}`
            : `🏆 SEASON ${seasonNumber} HAS ENDED!\n\nCongratulations to all survivors. Check the final leaderboard to see who dominated.\n\nSeason ${seasonNumber + 1} begins soon. 🔥\n\n#FarcasterCartel`;

        return this.postCast({
            text: castText,
            embeds: [{ url: `${process.env.NEXT_PUBLIC_URL}?view=leaderboard` }],
        });
    }

    // New member welcome post
    async postWelcomeEvent(playerAddress: string, referrer?: string) {
        const castText = referrer
            ? `🤝 New recruit!\n\n${playerAddress} just joined the cartel (referred by ${referrer}).\n\nWelcome to the family. 🎩\n\n#FarcasterCartel`
            : `🎩 ${playerAddress} just joined the Base Cartel!\n\nWelcome to the most ruthless syndicate on Base. 💼\n\n#FarcasterCartel`;

        return this.postCast({
            text: castText,
            embeds: [{ url: `${process.env.NEXT_PUBLIC_URL}` }],
        });
    }
}

// Export singleton instance
export const neynarService = new NeynarService();

// Example usage in event listener:
/*
import { neynarService } from './neynar-service';

// When Raid event is detected
contract.on('Raid', async (raider, target, amountStolen, success) => {
  await neynarService.postRaidEvent(
    raider,
    target,
    Number(amountStolen),
    success
  );
});

// When Betrayal event is detected
contract.on('Betrayal', async (traitor, amountStolen) => {
  await neynarService.postBetrayalEvent(
    traitor,
    Number(amountStolen)
  );
});

// When Season starts/ends
await neynarService.postSeasonEvent(2, 'start');
*/

