import { NextResponse } from 'next/server';
import { runAgentScheduler } from '@/lib/agent/scheduler';

export async function GET(request: Request) {
    // Verify Cron Secret (Vercel Cron)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const results = await runAgentScheduler();
        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error("Cron failed:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
