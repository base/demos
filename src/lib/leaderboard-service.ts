import { getCartelTitle } from './cartel-titles';

export interface LeaderboardEntry {
    rank: number;
    address: string;
    name: string;
    shares: number;
    totalClaimed: number;
    raidCount: number;
    fid?: number;
    lastActive: string;
    title?: string;
}

// Mock data - in future, replace with DB/Subgraph query
const MOCK_DATA: LeaderboardEntry[] = [
    {
        rank: 1,
        address: "0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        name: "User A (Boss)",
        shares: 2450,
        totalClaimed: 1220,
        raidCount: 15,
        fid: 3621,
        lastActive: new Date().toISOString()
    },
    {
        rank: 2,
        address: "0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        name: "User B (Capo)",
        shares: 1890,
        totalClaimed: 945,
        raidCount: 8,
        fid: 12345,
        lastActive: new Date(Date.now() - 3600000).toISOString()
    },
    {
        rank: 3,
        address: "0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        name: "User C (Target)",
        shares: 1420,
        totalClaimed: 710,
        raidCount: 12,
        fid: 67890,
        lastActive: new Date(Date.now() - 7200000).toISOString()
    },
    {
        rank: 4,
        address: "0xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
        name: "User D (New)",
        shares: 0,
        totalClaimed: 0,
        raidCount: 0,
        lastActive: new Date(Date.now() - 10800000).toISOString()
    },
    {
        rank: 5,
        address: "0x5678901234567890123456789012345678901234",
        name: "grinder.base",
        shares: 750,
        totalClaimed: 375,
        raidCount: 3,
        lastActive: new Date(Date.now() - 14400000).toISOString()
    }
];

export async function getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    // Simulate async DB call
    const data = MOCK_DATA.slice(0, limit);

    // Add titles
    return data.map(entry => ({
        ...entry,
        title: getCartelTitle(entry.rank, entry.shares)
    }));
}

export function generateLeaderboardPost(entries: LeaderboardEntry[]): string {
    if (entries.length === 0) return "No data available.";

    const topPlayer = entries[0];
    const runnersUp = entries.slice(1, 4).map(p => p.name.startsWith("0x") ? `${p.name.slice(0, 6)}...` : `@${p.name}`).join(", ");

    // Option B style (Highlight #1)
    return `👑 **New Cartel Boss Today:**\n` +
        `${topPlayer.name.startsWith("0x") ? topPlayer.name.slice(0, 6) : "@" + topPlayer.name} with ${topPlayer.shares.toLocaleString()} shares on Base.\n\n` +
        `Runners up: ${runnersUp}...\n` +
        `Full board: basecartel.in`;
}
