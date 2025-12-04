import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fid, buttonIndex } = body.untrustedData || {};

        if (buttonIndex === 1) {
            // Join action clicked
            const successFrame = {
                version: "vNext",
                image: `${process.env.NEXT_PUBLIC_URL}/api/frames/join/success?fid=${fid}`,
                buttons: [
                    {
                        label: "Open App",
                        action: "link",
                        target: `${process.env.NEXT_PUBLIC_URL}?ref=${fid}`
                    }
                ],
            };

            return NextResponse.json(successFrame);
        }

        // Default response
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('[Frame] Join action error:', error);
        return NextResponse.json({ error: 'Frame error' }, { status: 500 });
    }
}
