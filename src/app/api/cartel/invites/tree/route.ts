import { NextResponse } from 'next/server';
import { getClanTree } from '@/lib/clan-service';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');
        const depth = Number(searchParams.get('depth')) || 2;

        if (!address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }

        const tree = await getClanTree(address, depth);
        return NextResponse.json({
            rootAddress: address,
            depth,
            tree
        });
    } catch (error) {
        console.error('Clan Tree API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
