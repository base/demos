import prisma from '@/lib/prisma';

export async function generateNewsFromEvents() {
    // 1. Find events that don't have a news entry
    const events = await prisma.cartelEvent.findMany({
        where: {
            news: null,
            type: { in: ['RAID', 'HIGH_STAKES_RAID', 'RETIRE'] }
        },
        take: 50 // Process in batches
    });

    if (events.length === 0) return 0;

    let createdCount = 0;

    for (const ev of events) {
        const headline = generateHeadline(ev);

        await prisma.cartelNews.create({
            data: {
                eventId: ev.id,
                type: ev.type,
                headline,
                timestamp: ev.timestamp,
                attacker: ev.attacker,
                target: ev.target,
                user: ev.user,
                txHash: ev.txHash,
                importance: calculateImportance(ev)
            }
        });
        createdCount++;
    }

    return createdCount;
}

function generateHeadline(ev: any): string {
    const attacker = formatAddress(ev.attacker);
    const target = formatAddress(ev.target);
    const user = formatAddress(ev.user);

    if (ev.type === 'RAID') {
        return `⚔️ ${attacker} raided ${target} and stole ${ev.stolenShares} shares.`;
    }

    if (ev.type === 'HIGH_STAKES_RAID') {
        return `🔥 ${attacker} launched a high-stakes raid on ${target}, stealing ${ev.stolenShares} shares and burning ${ev.selfPenaltyShares} of their own.`;
    }

    if (ev.type === 'RETIRE') {
        return `💀 ${user} retired from the cartel, cashing out ${ev.payout} USDC.`;
    }

    return `Activity detected on the network.`;
}

function calculateImportance(ev: any): number {
    if (ev.type === 'HIGH_STAKES_RAID') return 8;
    if (ev.type === 'RETIRE' && ev.payout > 1000) return 9;
    return 5;
}

function formatAddress(addr?: string): string {
    if (!addr) return "Unknown";
    // TODO: Lookup handle if available
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export async function getNews(limit: number = 20) {
    return await prisma.cartelNews.findMany({
        orderBy: { timestamp: 'desc' },
        take: limit
    });
}
