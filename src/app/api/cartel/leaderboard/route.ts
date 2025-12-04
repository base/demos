import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/leaderboard-service';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = Math.min(Number(searchParams.get('limit')) || 10, 50);

        const leaderboard = await getLeaderboard(limit);

        return NextResponse.json({
            generatedAt: new Date().toISOString(),
            leaderboard
        });
    } catch (error) {
        console.error('Leaderboard API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
