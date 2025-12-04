import { NextResponse } from 'next/server';
import { getLoginSummary } from '@/lib/summary-service';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }

        const summary = await getLoginSummary(address);

        return NextResponse.json(summary);
    } catch (error) {
        console.error('Summary API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
