import { NextResponse } from 'next/server';
import { getLeaderboard, generateLeaderboardPost } from '@/lib/leaderboard-service';

export async function GET(request: Request) {
    try {
        // Admin check (simple secret for now, or rely on Vercel protection)
        // For preview, we might just allow it or check ADMIN_SECRET
        const url = new URL(request.url);
        const secret = url.searchParams.get('secret');

        if (secret !== process.env.ADMIN_SECRET && process.env.NODE_ENV === 'production') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const leaderboard = await getLeaderboard(5);
        const text = generateLeaderboardPost(leaderboard);
        const enabled = process.env.LEADERBOARD_POST_ENABLED === 'true';

        return NextResponse.json({
            enabled,
            generatedAt: new Date().toISOString(),
            leaderboard,
            postText: text
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
