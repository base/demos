import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = Math.min(Number(searchParams.get('limit')) || 50, 100);
        const type = searchParams.get('type');

        const where = type ? { type } : {};

        // QA MOCKS
        return NextResponse.json({
            events: [
                { id: '1', type: 'RAID', attacker: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', target: '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', stolenShares: 10, feePaid: 5000, timestamp: new Date().toISOString(), txHash: '0x1' },
                { id: '2', type: 'HIGH_STAKES_RAID', attacker: '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', target: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', stolenShares: 50, selfPenaltyShares: 10, feePaid: 15000, timestamp: new Date(Date.now() - 60000).toISOString(), txHash: '0x2' },
                { id: '3', type: 'RETIRE', user: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', payout: 1000, timestamp: new Date(Date.now() - 120000).toISOString(), txHash: '0x3' }
            ]
        });

        /*
        const events = await prisma.cartelEvent.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            take: limit
        });

        return NextResponse.json({ events });
        */
    } catch (error) {
        console.error('Events API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
