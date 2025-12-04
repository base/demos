import { NextResponse } from 'next/server';
import { getNews } from '@/lib/news-service';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = Math.min(Number(searchParams.get('limit')) || 20, 50);

        const news = await getNews(limit);

        return NextResponse.json({
            generatedAt: new Date().toISOString(),
            news
        });
    } catch (error) {
        console.error('News API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
