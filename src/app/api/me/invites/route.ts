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
                invites: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            invites: user.invites.map(invite => ({
                code: invite.code,
                status: invite.status,
                type: invite.type,
                createdAt: invite.createdAt,
                // usedAt: invite.usedAt // Removed as it's not on the Invite model directly anymore
            }))
        });

    } catch (error) {
        console.error('Error fetching invites:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
