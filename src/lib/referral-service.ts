import prisma from './prisma';

// Config constants (can be moved to env later)
const REFERRAL_POINTS_ALPHA = 1.0; // Points per 1 USDC fee paid
const REFERRAL_POINTS_BETA = 0.5;  // Points per 1 USDC profit earned

export async function trackReferralFee(refereeUserId: string, feeAmount: number) {
    try {
        const referral = await prisma.referral.findUnique({
            where: { refereeId: refereeUserId }
        });

        if (!referral) return; // User was not referred

        // Update referral record
        const updatedReferral = await prisma.referral.update({
            where: { id: referral.id },
            data: {
                totalFeesPaidByReferee: { increment: feeAmount }
            }
        });

        await updateReferralPoints(updatedReferral.id);
    } catch (error) {
        console.error("Error tracking referral fee:", error);
    }
}

export async function trackReferralProfit(refereeUserId: string, profitAmount: number) {
    try {
        const referral = await prisma.referral.findUnique({
            where: { refereeId: refereeUserId }
        });

        if (!referral) return; // User was not referred

        // Update referral record
        const updatedReferral = await prisma.referral.update({
            where: { id: referral.id },
            data: {
                totalProfitShareEarnedByReferee: { increment: profitAmount }
            }
        });

        await updateReferralPoints(updatedReferral.id);
    } catch (error) {
        console.error("Error tracking referral profit:", error);
    }
}

async function updateReferralPoints(referralId: string) {
    const referral = await prisma.referral.findUnique({
        where: { id: referralId }
    });

    if (!referral || !referral.isRewardable) return;

    // Calculate points: (alpha * fees) + (beta * profit)
    const points = (REFERRAL_POINTS_ALPHA * referral.totalFeesPaidByReferee) +
        (REFERRAL_POINTS_BETA * referral.totalProfitShareEarnedByReferee);

    // Update referral record
    await prisma.referral.update({
        where: { id: referralId },
        data: { referralPoints: points }
    });

    // Update referrer's total points
    await updateReferrerTotalPoints(referral.referrerId);
}

async function updateReferrerTotalPoints(referrerId: string) {
    const referrals = await prisma.referral.findMany({
        where: { referrerId: referrerId }
    });

    const totalPoints = referrals.reduce((sum, ref) => sum + ref.referralPoints, 0);

    await prisma.user.update({
        where: { id: referrerId },
        data: { referralPointsTotal: totalPoints }
    });
}
