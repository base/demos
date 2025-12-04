import { NextResponse } from 'next/server';

// Frame metadata for "Raid" action
export async function GET() {
    const frameMetadata = {
        version: "vNext",
        image: `${process.env.NEXT_PUBLIC_URL}/api/frames/raid/image`,
        buttons: [
            {
                label: "Execute Raid ⚔️",
                action: "post",
                target: `${process.env.NEXT_PUBLIC_URL}/api/frames/raid/action`
            },
            {
                label: "View Leaderboard",
                action: "link",
                target: `${process.env.NEXT_PUBLIC_URL}?view=leaderboard`
            }
        ],
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frames/raid/action`,
        input: {
            text: "Target address (0x...)"
        }
    };

    return NextResponse.json(frameMetadata);
}
