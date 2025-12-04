import { NextResponse } from 'next/server';
import { getMostWanted } from '@/lib/threat-service';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = Math.min(Number(searchParams.get('limit')) || 10, 20);
        const windowHours = Math.min(Number(searchParams.get('windowHours')) || 24, 168);

        // QA MOCKS
        return NextResponse.json({
            windowHours,
            generatedAt: new Date().toISOString(),
            players: [
                { rank: 1, address: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', handle: 'User A', threatScore: 100, normalRaidsInitiated: 15, highStakesRaidsInitiated: 10, timesRaided: 2 },
                { rank: 2, address: '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', handle: 'User B', threatScore: 50, normalRaidsInitiated: 8, highStakesRaidsInitiated: 5, timesRaided: 1 },
                { rank: 3, address: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', handle: 'User C', threatScore: 20, normalRaidsInitiated: 12, highStakesRaidsInitiated: 0, timesRaided: 5 }
            ]
        });

        /*
        const players = await getMostWanted(limit, windowHours);

        return NextResponse.json({
            windowHours,
            generatedAt: new Date().toISOString(),
            players
        });
        */
    } catch (error) {
        console.error('Most Wanted API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
