import { NextResponse } from 'next/server';

// Mock leaderboard data
// In production, this would query a database populated by event listeners
const LEADERBOARD_DATA = [
    {
        rank: 1,
        address: "0x1234567890123456789012345678901234567890",
        name: "kingpin.eth",
        shares: 2450,
        totalClaimed: 1220,
        raidCount: 15,
        fid: 3621,
        lastActive: new Date().toISOString()
    },
    {
        rank: 2,
        address: "0x2345678901234567890123456789012345678901",
        name: "shadowboss.base",
        shares: 1890,
        totalClaimed: 945,
        raidCount: 8,
        fid: 12345,
        lastActive: new Date(Date.now() - 3600000).toISOString()
    },
    {
        rank: 3,
        address: "0x3456789012345678901234567890123456789012",
        name: "whale.eth",
        shares: 1420,
        totalClaimed: 710,
        raidCount: 12,
        fid: 67890,
        lastActive: new Date(Date.now() - 7200000).toISOString()
    },
    {
        rank: 4,
        address: "0x4567890123456789012345678901234567890123",
        name: "hustler25",
        shares: 980,
        totalClaimed: 490,
        raidCount: 5,
        lastActive: new Date(Date.now() - 10800000).toISOString()
    },
    {
        rank: 5,
        address: "0x5678901234567890123456789012345678901234",
        name: "grinder.base",
        shares: 750,
        totalClaimed: 375,
        raidCount: 3,
        lastActive: new Date(Date.now() - 14400000).toISOString()
    },
];

export async function GET(request: Request) {
    try {
        // Basic rate limiting check (production would use Redis/Upstash)
        const origin = request.headers.get('origin');
        const allowedOrigins = [
            'http://localhost:3000',
            process.env.NEXT_PUBLIC_URL,
        ].filter(Boolean);

        // CORS check
        if (origin && !allowedOrigins.includes(origin)) {
            return NextResponse.json(
                { error: 'Unauthorized origin' },
                { status: 403 }
            );
        }

        // In production, query from database:
        // const leaderboard = await db.query('SELECT ...');

        return NextResponse.json({
            success: true,
            data: LEADERBOARD_DATA,
            timestamp: new Date().toISOString(),
            totalPlayers: LEADERBOARD_DATA.length,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            }
        });
    } catch (error) {
        console.error('Leaderboard API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
