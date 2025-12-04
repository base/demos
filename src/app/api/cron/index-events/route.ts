import { NextResponse } from 'next/server';
import { indexEvents } from '@/lib/indexer-service';

export async function GET(request: Request) {
    try {
        // Verify Cron Secret
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await indexEvents();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Indexing error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
