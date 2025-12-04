import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { walletAddress, farcasterId, inviteCode } = body;

        if (!walletAddress || !inviteCode) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { walletAddress: walletAddress },
                    { farcasterId: farcasterId ? farcasterId.toString() : undefined }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // 2. Validate invite code
        const invite = await prisma.invite.findUnique({
            where: { code: inviteCode },
            include: { creator: true }
        });

        if (!invite) {
            return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 });
        }

        if (invite.status !== 'unused' && invite.usedCount >= invite.maxUses) {
            return NextResponse.json({ error: 'Invite already used' }, { status: 400 });
        }



        // 3. Create User, Update Invite, Create Referrals, Generate New Invites
        const result = await prisma.$transaction(async (tx) => {
            // Create User
            const newUser = await tx.user.create({
                data: {
                    walletAddress,
                    farcasterId: farcasterId ? farcasterId.toString() : null,
                }
            });

            // Update Invite
            const newUsedCount = invite.usedCount + 1;
            const newStatus = newUsedCount >= invite.maxUses ? 'used' : 'unused';

            await tx.invite.update({
                where: { id: invite.id },
                data: {
                    usedCount: { increment: 1 },
                    status: newStatus
                }
            });

            // Create Referral Record
            if (invite.creatorId) {
                await tx.referral.create({
                    data: {
                        referrerId: invite.creatorId,
                        refereeId: newUser.id,
                        inviteId: invite.id,
                        isRewardable: invite.type !== 'founder' // Exclude founder invites from rewards
                    }
                });
            }

            // Generate 3 new invites for the new user
            const newInvites = [];
            for (let i = 0; i < 3; i++) {
                newInvites.push({
                    code: 'BASE-' + uuidv4().substring(0, 6).toUpperCase(),
                    creatorId: newUser.id,
                    type: 'user',
                    maxUses: 1,
                    status: 'unused'
                });
            }

            // SQLite doesn't support createMany, so we map
            for (const inv of newInvites) {
                await tx.invite.create({ data: inv });
            }

            return { user: newUser, newInvites };
        });

        return NextResponse.json({
            success: true,
            user: result.user,
            invites: result.newInvites.map(i => i.code)
        });

    } catch (error) {
        console.error('Error joining with invite:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
