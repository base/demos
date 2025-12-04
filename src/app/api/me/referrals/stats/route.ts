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
            where: { walletAddress },
            include: {
                referrals: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Aggregate stats
        const totalReferees = user.referrals.length;
        const totalFeesPaidByReferees = user.referrals.reduce((sum, ref) => sum + ref.totalFeesPaidByReferee, 0);
        const totalProfitEarnedByReferees = user.referrals.reduce((sum, ref) => sum + ref.totalProfitShareEarnedByReferee, 0);

        return NextResponse.json({
            referralPointsTotal: user.referralPointsTotal,
            referralRewardsClaimable: user.referralRewardsClaimable,
            referralRewardsClaimed: user.referralRewardsClaimed,
            stats: {
                totalReferees,
                totalFeesPaidByReferees,
                totalProfitEarnedByReferees
            }
        });

    } catch (error) {
        console.error('Error fetching referral stats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
