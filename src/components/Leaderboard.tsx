import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
// import { useViewProfile } from "@coinbase/onchainkit/minikit";
import { haptics } from "@/lib/haptics";

interface Player {
    rank: number;
    name: string;
    shares: number;
    yield: number;
    fid?: number;
}

const MOCK_LEADERBOARD: Player[] = [
    { rank: 1, name: "kingpin.eth", shares: 2450, yield: 122, fid: 3621 },
    { rank: 2, name: "shadowboss.base", shares: 1890, yield: 94, fid: 12345 },
    { rank: 3, name: "whale.eth", shares: 1420, yield: 71, fid: 67890 },
    { rank: 4, name: "hustler25", shares: 980, yield: 49 },
    { rank: 5, name: "grinder.base", shares: 750, yield: 37 },
    { rank: 6, name: "crypto_don", shares: 620, yield: 31 },
    { rank: 7, name: "vault.base", shares: 580, yield: 29 },
    { rank: 8, name: "raider99", shares: 510, yield: 25 },
    { rank: 9, name: "boss.eth", shares: 480, yield: 24 },
    { rank: 10, name: "cartel_og", shares: 450, yield: 22 },
];

export default function Leaderboard() {
    // const viewProfile = useViewProfile();

    const handleViewProfile = async (fid?: number) => {
        if (fid) {
            await haptics.light();
            console.log("View profile:", fid);
            // viewProfile({ fid });
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E12] text-white p-4 pb-24 max-w-[400px] mx-auto">
            <Card className="card-glow border-[#4A87FF]/30">
                <CardHeader className="pb-4">
                    <div className="text-center">
                        <CardTitle className="text-2xl heading-font text-neon-blue mb-1">
                            🏆 Cartel Rankings
                        </CardTitle>
                        <p className="text-sm text-[#D4AF37]">Season 1</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {MOCK_LEADERBOARD.map((player) => {
                            const isTopThree = player.rank <= 3;
                            const isTopTen = player.rank <= 10;

                            return (
                                <div
                                    key={player.rank}
                                    className={`p-3 rounded-lg border transition-all duration-300 ${player.rank === 1
                                        ? "bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/50 glow-gold"
                                        : player.rank === 2
                                            ? "bg-gradient-to-r from-zinc-400/20 to-zinc-400/5 border-zinc-400/50"
                                            : player.rank === 3
                                                ? "bg-gradient-to-r from-orange-600/20 to-orange-600/5 border-orange-600/50"
                                                : isTopTen
                                                    ? "bg-[#1B1F26] border-[#4A87FF]/20"
                                                    : "bg-[#1B1F26] border-zinc-800"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className={`text-2xl font-black ${player.rank === 1 ? "text-[#D4AF37]" :
                                                player.rank === 2 ? "text-zinc-300" :
                                                    player.rank === 3 ? "text-orange-500" :
                                                        "text-zinc-500"
                                                }`}>
                                                {player.rank === 1 && "👑"}
                                                {player.rank === 2 && "🥈"}
                                                {player.rank === 3 && "🥉"}
                                                {player.rank > 3 && `#${player.rank}`}
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-bold ${isTopThree ? "text-white" : "text-zinc-300"
                                                    }`}>
                                                    {player.name}
                                                </div>
                                                <div className="text-xs text-zinc-500 flex items-center gap-2">
                                                    <span className="text-[#4A87FF]">{player.shares} shares</span>
                                                    <span>•</span>
                                                    <span className="text-[#3DFF72]">${player.yield}/day</span>
                                                </div>
                                            </div>
                                        </div>
                                        {player.fid && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewProfile(player.fid)}
                                                className="text-xs h-7 border-[#4A87FF]/30 hover:border-[#4A87FF] hover:bg-[#4A87FF]/10 text-[#4A87FF]"
                                            >
                                                View
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 p-4 bg-[#4A87FF]/5 border border-[#4A87FF]/20 rounded-lg text-center">
                        <p className="text-sm text-zinc-400">
                            Top 10 players earn <span className="text-[#D4AF37] font-bold">exclusive badges</span> at season end
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
