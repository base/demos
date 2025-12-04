import { NextResponse } from 'next/server';
import { getClanSummary } from '@/lib/clan-service';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }

        // QA MOCKS
        if (address === '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') {
            return NextResponse.json({
                address,
                directInvitesUsed: 2,
                maxInvites: 3,
                remainingInvites: 1,
                totalClanMembers: 3,
                clanTotalShares: 3310,
                clanRaidCount: 20,
                directInvitees: [
                    { address: '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', joinedAt: new Date().toISOString(), shares: 1890, raidsBy: 8, highStakesBy: 5 },
                    { address: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', joinedAt: new Date().toISOString(), shares: 1420, raidsBy: 12, highStakesBy: 0 }
                ]
            });
        }
        if (address === '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB') {
            return NextResponse.json({
                address,
                directInvitesUsed: 1,
                maxInvites: 3,
                remainingInvites: 2,
                totalClanMembers: 1,
                clanTotalShares: 0,
                clanRaidCount: 0,
                directInvitees: [
                    { address: '0xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', joinedAt: new Date().toISOString(), shares: 0, raidsBy: 0, highStakesBy: 0 }
                ]
            });
        }


        const summary = await getClanSummary(address);
        return NextResponse.json(summary);
    } catch (error) {
        console.error('Clan API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
