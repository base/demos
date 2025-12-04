import prisma from '@/lib/prisma';

export interface LoginSummary {
    address: string;
    lastSeenAt: string | null;
    since: string;
    until: string;
    raidsOnYou: number;
    raidsByYou: number;
    highStakesByYou: number;
    retired: boolean;
    currentShares: number; // Placeholder for now
    rank: number; // Placeholder
    notableEvents: NotableEvent[];
}

export interface NotableEvent {
    type: string;
    direction: 'onYou' | 'byYou';
    otherPartyHandle: string;
    stolenShares?: number;
    selfPenaltyShares?: number;
    timestamp: string;
}

export async function getLoginSummary(address: string): Promise<LoginSummary> {
    // 1. Get User and Last Seen
    let user = await prisma.user.findUnique({
        where: { walletAddress: address }
    });

    // If user doesn't exist, create them (lazy auth)
    if (!user) {
        user = await prisma.user.create({
            data: { walletAddress: address }
        });
    }

    const now = new Date();
    const lastSeen = user.lastSeenAt;
    // Default to 24h ago if never seen, or if last seen is very old (> 7 days)
    const since = lastSeen ? lastSeen : new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // 2. Query Events
    const events = await prisma.cartelEvent.findMany({
        where: {
            timestamp: { gte: since },
            OR: [
                { attacker: address },
                { target: address },
                { user: address } // For retire
            ]
        },
        orderBy: { timestamp: 'desc' }
    });

    // 3. Aggregate Stats
    let raidsOnYou = 0;
    let raidsByYou = 0;
    let highStakesByYou = 0;
    let retired = false;
    const notableEvents: NotableEvent[] = [];

    for (const ev of events) {
        if (ev.type === 'RETIRE' && ev.user === address) {
            retired = true;
        } else if (ev.type === 'RAID' || ev.type === 'HIGH_STAKES_RAID') {
            if (ev.target === address) {
                raidsOnYou++;
                // Add notable event if significant
                if (ev.stolenShares && ev.stolenShares > 5) {
                    notableEvents.push({
                        type: ev.type,
                        direction: 'onYou',
                        otherPartyHandle: ev.attacker || 'Unknown',
                        stolenShares: ev.stolenShares,
                        timestamp: ev.timestamp.toISOString()
                    });
                }
            } else if (ev.attacker === address) {
                if (ev.type === 'RAID') raidsByYou++;
                if (ev.type === 'HIGH_STAKES_RAID') highStakesByYou++;

                if (ev.type === 'HIGH_STAKES_RAID') {
                    notableEvents.push({
                        type: ev.type,
                        direction: 'byYou',
                        otherPartyHandle: ev.target || 'Unknown',
                        stolenShares: ev.stolenShares || 0,
                        selfPenaltyShares: ev.selfPenaltyShares || 0,
                        timestamp: ev.timestamp.toISOString()
                    });
                }
            }
        }
    }

    // 4. Update Last Seen
    await prisma.user.update({
        where: { walletAddress: address },
        data: { lastSeenAt: now }
    });

    return {
        address,
        lastSeenAt: lastSeen ? lastSeen.toISOString() : null,
        since: since.toISOString(),
        until: now.toISOString(),
        raidsOnYou,
        raidsByYou,
        highStakesByYou,
        retired,
        currentShares: 0, // TODO: Fetch from contract or indexer
        rank: 0, // TODO: Fetch from leaderboard
        notableEvents: notableEvents.slice(0, 3) // Top 3
    };
}
