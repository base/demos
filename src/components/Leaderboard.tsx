import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { haptics } from "@/lib/haptics";
import { getCartelTitle, getTitleTheme } from "@/lib/cartel-titles";

interface Player {
    rank: number;
    name: string;
    shares: number;
    totalClaimed: number;
    fid?: number;
}

import { useState, useEffect } from 'react';

export default function Leaderboard() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch('/api/cartel/leaderboard');
                const data = await res.json();
                if (data.leaderboard) {
                    setPlayers(data.leaderboard);
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const handleViewProfile = async (fid?: number) => {
        if (fid) {
            await haptics.light();
            console.log("View profile:", fid);
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
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-16 bg-zinc-900 rounded-lg"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {players.map((player) => {
                                const title = getCartelTitle(player.rank, player.shares);
                                const theme = getTitleTheme(title);
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
                                                    <div className="flex items-center gap-2">
                                                        <div className={`font-bold ${isTopThree ? "text-white" : "text-zinc-300"
                                                            }`}>
                                                            {player.name}
                                                        </div>
                                                        {/* Title Badge */}
                                                        <div className={`text-[10px] px-1.5 py-0.5 rounded border border-white/10 ${theme.color} bg-black/30 flex items-center gap-1`}>
                                                            <span>{theme.icon}</span>
                                                            <span className="uppercase tracking-wider font-bold">{title}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                                                        <span className="text-[#4A87FF]">{player.shares} shares</span>
                                                        <span>•</span>
                                                        <span className="text-[#3DFF72]">${player.totalClaimed.toLocaleString()} claimed</span>
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
                    )}

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
