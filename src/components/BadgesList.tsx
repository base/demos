import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface BadgeItem {
    id: string;
    name: string;
    icon: string;
    description: string;
    earned: boolean;
}

const MOCK_BADGES: BadgeItem[] = [
    { id: "og", name: "OG Member", icon: "👑", description: "Joined in Season 1", earned: true },
    { id: "raider", name: "Top Raider", icon: "⚔️", description: "Successful raid streak", earned: false },
    { id: "farmer", name: "Yield Farmer", icon: "🌾", description: "Claimed yield 7 days in a row", earned: true },
    { id: "whale", name: "Cartel Whale", icon: "🐋", description: "Hold > 10,000 shares", earned: false },
];

export default function BadgesList() {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex justify-between items-center">
                    <span>Badges</span>
                    <span className="text-xs font-normal text-zinc-500">2/4 Earned</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    {MOCK_BADGES.map((badge) => (
                        <div
                            key={badge.id}
                            className={`p-3 rounded-lg border ${badge.earned
                                ? "bg-zinc-800 border-zinc-700"
                                : "bg-zinc-950 border-zinc-900 opacity-50"
                                }`}
                        >
                            <div className="text-2xl mb-1">{badge.icon}</div>
                            <div className="font-bold text-sm text-zinc-200">{badge.name}</div>
                            <div className="text-xs text-zinc-500 leading-tight mt-1">
                                {badge.description}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
