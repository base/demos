import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }

        // QA MOCKS
        if (address === '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') return NextResponse.json({ highStakesCount: 10, shares: 2450, rank: 1 });
        if (address === '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB') return NextResponse.json({ highStakesCount: 5, shares: 1890, rank: 2 });
        if (address === '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC') return NextResponse.json({ highStakesCount: 0, shares: 1420, rank: 3 });
        if (address === '0xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD') return NextResponse.json({ highStakesCount: 0, shares: 0, rank: 100 });


        const highStakesCount = await prisma.cartelEvent.count({
            where: {
                attacker: address,
                type: 'HIGH_STAKES_RAID'
            }
        });

        // Get user shares
        const user = await prisma.user.findUnique({
            where: { walletAddress: address },
            select: { shares: true }
        });

        // Calculate rank (simple count of users with more shares)
        const rank = await prisma.user.count({
            where: {
                shares: { gt: user?.shares || 0 }
            }
        }) + 1;

        return NextResponse.json({
            highStakesCount,
            shares: user?.shares || 0,
            rank
        });
    } catch (error) {
        console.error('Stats API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
