import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const walletAddress = searchParams.get('walletAddress');

        if (!walletAddress) {
            return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { walletAddress }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const referrals = await prisma.referral.findMany({
            where: { referrerId: user.id },
            include: {
                referee: {
                    select: {
                        walletAddress: true,
                        farcasterId: true
                    }
                }
            },
            orderBy: { joinedAt: 'desc' }
        });

        return NextResponse.json({
            referrals: referrals.map(ref => ({
                id: ref.id,
                referee: ref.referee,
                joinedAt: ref.joinedAt,
                // New metrics
                totalFeesPaid: ref.totalFeesPaidByReferee,
                totalProfitEarned: ref.totalProfitShareEarnedByReferee,
                referralPoints: ref.referralPoints
            }))
        });

    } catch (error) {
        console.error('Error fetching referrals:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
