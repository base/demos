import { NextResponse } from 'next/server';
import { getLeaderboard, generateLeaderboardPost } from '@/lib/leaderboard-service';

export async function GET(request: Request) {
    try {
        // Verify Cron Secret (Vercel Cron)
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const enabled = process.env.LEADERBOARD_POST_ENABLED === 'true';

        // 1. Fetch top players
        const leaderboard = await getLeaderboard(5);

        // 2. Build post text
        const text = generateLeaderboardPost(leaderboard);

        // 3. If disabled -> log only
        if (!enabled) {
            console.log("[Leaderboard Preview]", text);
            return NextResponse.json({
                success: true,
                posted: false,
                message: "Leaderboard post disabled (preview mode)",
                preview: text
            });
        }

        // 4. If enabled -> send to Farcaster
        await postToFarcaster(text);

        return NextResponse.json({
            success: true,
            posted: true,
            message: "Leaderboard posted to Farcaster"
        });

    } catch (error) {
        console.error('Cron error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

async function postToFarcaster(text: string): Promise<void> {
    const signerKey = process.env.FARCASTER_SIGNER_KEY;

    if (!signerKey) {
        console.warn("Farcaster posting not configured – skipping actual post.");
        return;
    }

    // TODO: Implement actual posting logic using Neynar or Warpcast API
    // const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
    // await neynarClient.publishCast(signerKey, text);

    console.log("Simulating Farcaster Post:", text);
}
