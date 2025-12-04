import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { count = 1, secret } = body;

        // Simple admin protection
        console.log("Admin Debug - Received:", secret);
        console.log("Admin Debug - Expected:", process.env.ADMIN_SECRET);

        if (secret !== process.env.ADMIN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const invites = [];
        for (let i = 0; i < count; i++) {
            // Generate a short code: BASE-XXXXXX
            const shortCode = 'BASE-' + uuidv4().substring(0, 6).toUpperCase();

            invites.push({
                code: shortCode,
                type: 'founder',
                maxUses: 1,
                status: 'unused'
            });
        }

        // Create invites in DB
        // Note: createMany is not supported in SQLite, so we use a transaction or loop
        // For SQLite compatibility, we'll use a transaction
        const createdInvites = await prisma.$transaction(
            invites.map((invite) => prisma.invite.create({ data: invite }))
        );

        return NextResponse.json({
            success: true,
            count: createdInvites.length,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            invites: createdInvites.map((i: any) => i.code)
        });

    } catch (error) {
        console.error('Error generating invites:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : '';
        return NextResponse.json({ success: false, error: errorMessage, stack: errorStack }, { status: 200 });
    }
}
