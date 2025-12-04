import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fid, buttonIndex, inputText } = body.untrustedData || {};

        if (buttonIndex === 1) {
            // Raid action clicked
            const targetAddress = inputText || '0x...';

            const successFrame = {
                version: "vNext",
                image: `${process.env.NEXT_PUBLIC_URL}/api/frames/raid/result?fid=${fid}&target=${targetAddress}`,
                buttons: [
                    {
                        label: "Open App",
                        action: "link",
                        target: `${process.env.NEXT_PUBLIC_URL}?action=raid&fid=${fid}`
                    },
                    {
                        label: "Raid Again",
                        action: "post",
                        target: `${process.env.NEXT_PUBLIC_URL}/api/frames/raid`
                    }
                ],
            };

            return NextResponse.json(successFrame);
        }

        // Default response
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('[Frame] Raid action error:', error);
        return NextResponse.json({ error: 'Frame error' }, { status: 500 });
    }
}
