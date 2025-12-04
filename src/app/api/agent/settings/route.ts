import { NextResponse } from 'next/server';
import { AgentDB, AgentSettings } from '@/lib/agent/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userAddress, enabled, strategy, budget, maxShareRisk, delegation } = body;

        if (!userAddress) {
            return NextResponse.json({ success: false, error: "Missing userAddress" }, { status: 400 });
        }

        // Basic validation
        if (budget < 0) return NextResponse.json({ success: false, error: "Invalid budget" }, { status: 400 });

        const settings: AgentSettings = {
            userAddress,
            enabled: !!enabled,
            strategy: strategy || 'conservative',
            budget: Number(budget) || 0,
            maxShareRisk: Number(maxShareRisk) || 0,
            delegation: delegation || null,
            lastRun: 0
        };

        // Preserve lastRun if exists
        const existing = AgentDB.get(userAddress);
        if (existing) {
            settings.lastRun = existing.lastRun;
        }

        AgentDB.save(settings);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save settings:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');

    if (!userAddress) {
        return NextResponse.json({ success: false, error: "Missing userAddress" }, { status: 400 });
    }

    const settings = AgentDB.get(userAddress);
    return NextResponse.json({ success: true, settings });
}
