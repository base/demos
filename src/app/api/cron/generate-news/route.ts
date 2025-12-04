import { NextResponse } from 'next/server';
import { generateNewsFromEvents } from '@/lib/news-service';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const count = await generateNewsFromEvents();
        return NextResponse.json({ success: true, generated: count });
    } catch (error) {
        console.error('News generation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
