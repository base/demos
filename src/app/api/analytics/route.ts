import { NextResponse } from 'next/server';

// Internal analytics endpoint - should be protected in production
export async function GET() {
    try {
        // In production, fetch from database
        const metrics = {
            overview: {
                totalMembers: 487,
                activeMembersToday: 156,
                potBalance: 54320, // USDC
                totalSharesCirculating: 48700,
            },
            today: {
                joins: 12,
                raids: 34,
                betrayals: 2,
                revenue: 185, // USDC
            },
            last7Days: {
                joins: 89,
                raids: 234,
                betrayals: 7,
                avgDailyActiveUsers: 142,
            },
            topHolders: [
                { rank: 1, address: '0x1234...', shares: 2450, pctOfTotal: 5.03 },
                { rank: 2, address: '0x2345...', shares: 1890, pctOfTotal: 3.88 },
                { rank: 3, address: '0x3456...', shares: 1420, pctOfTotal: 2.92 },
                { rank: 4, address: '0x4567...', shares: 980, pctOfTotal: 2.01 },
                { rank: 5, address: '0x5678...', shares: 750, pctOfTotal: 1.54 },
            ],
            raidStats: {
                totalRaids: 1247,
                successRate: 67.3, // percentage
                avgSharesStolen: 28,
            },
            revenueBreakdown: {
                joinFees: 4870, // USDC
                raidFees: 6235, // USDC
                totalRevenue: 11105, // USDC
            },
        };

        return NextResponse.json(metrics);
    } catch (error) {
        console.error('[Analytics] Error:', error);
        return NextResponse.json({ error: 'Analytics error' }, { status: 500 });
    }
}
