import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');
        const direction = searchParams.get('direction') || 'all'; // all, by, on
        const type = searchParams.get('type') || 'all'; // all, normal, highstakes
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        if (!address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }

        // QA MOCKS
        if (address === '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' || address === '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB' || address === '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC') {
            const mockEvents = [
                { id: '1', type: 'RAID', attacker: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', target: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', stolenShares: 10, feePaid: 5000, timestamp: new Date().toISOString(), txHash: '0x1' },
                { id: '2', type: 'RAID', attacker: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', target: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', stolenShares: 20, feePaid: 5000, timestamp: new Date(Date.now() - 100000).toISOString(), txHash: '0x2' },
                { id: '3', type: 'HIGH_STAKES_RAID', attacker: '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', target: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', stolenShares: 50, selfPenaltyShares: 10, feePaid: 15000, timestamp: new Date(Date.now() - 200000).toISOString(), txHash: '0x3' },
            ];

            let filtered = mockEvents.filter(ev => {
                if (direction === 'by') return ev.attacker === address;
                if (direction === 'on') return ev.target === address;
                return ev.attacker === address || ev.target === address;
            });

            if (type !== 'all') {
                filtered = filtered.filter(ev => type === 'normal' ? ev.type === 'RAID' : ev.type === 'HIGH_STAKES_RAID');
            }

            const enriched = filtered.map(ev => ({
                ...ev,
                direction: ev.attacker === address ? 'by' : 'on'
            }));

            return NextResponse.json({
                address,
                direction,
                type,
                limit,
                offset,
                events: enriched
            });
        }


        const where: any = {};

        // Type Filter
        if (type === 'normal') {
            where.type = 'RAID';
        } else if (type === 'highstakes') {
            where.type = 'HIGH_STAKES_RAID';
        } else {
            where.type = { in: ['RAID', 'HIGH_STAKES_RAID'] };
        }

        // Direction Filter
        if (direction === 'by') {
            where.attacker = address;
        } else if (direction === 'on') {
            where.target = address;
        } else {
            where.OR = [
                { attacker: address },
                { target: address }
            ];
        }

        const events = await prisma.cartelEvent.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            take: Math.min(limit, 50),
            skip: offset,
            // We could include attacker/target user details if we linked them in schema
            // But CartelEvent stores strings. We can try to fetch usernames separately or just show addresses.
        });

        // Enrich with direction
        const enriched = events.map(ev => {
            const isByUser = ev.attacker?.toLowerCase() === address.toLowerCase();

            return {
                id: ev.id,
                type: ev.type,
                direction: isByUser ? 'by' : 'on',
                timestamp: ev.timestamp,
                txHash: ev.txHash,
                attacker: ev.attacker,
                target: ev.target,
                stolenShares: ev.stolenShares,
                selfPenaltyShares: ev.selfPenaltyShares,
                feePaid: ev.feePaid
            };
        });

        return NextResponse.json({
            address,
            direction,
            type,
            limit,
            offset,
            events: enriched
        });

    } catch (error) {
        console.error('Raid History API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
