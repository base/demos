import { NextResponse } from 'next/server';

// Frame metadata for "Join Cartel" action
export async function GET() {
    const frameMetadata = {
        version: "vNext",
        image: `${process.env.NEXT_PUBLIC_URL}/api/frames/join/image`,
        buttons: [
            {
                label: "Join the Cartel",
                action: "post",
                target: `${process.env.NEXT_PUBLIC_URL}/api/frames/join/action`
            },
            {
                label: "View Details",
                action: "link",
                target: `${process.env.NEXT_PUBLIC_URL}`
            }
        ],
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frames/join/action`,
    };

    return NextResponse.json(frameMetadata);
}
