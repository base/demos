import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/leaderboard-service';

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

        const data = await getLeaderboard(100);

        return NextResponse.json({
            success: true,
            data: data,
            timestamp: new Date().toISOString(),
            totalPlayers: data.length,
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
