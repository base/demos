import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ThreatEntry {
    rank: number;
    address: string;
    handle?: string;
    threatScore: number;
    normalRaidsInitiated: number;
    highStakesRaidsInitiated: number;
    timesRaided: number;
}

export default function MostWantedBoard() {
    const [players, setPlayers] = useState<ThreatEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [windowHours, setWindowHours] = useState(24);

    const fetchMostWanted = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/cartel/most-wanted?windowHours=${windowHours}&limit=5`);
            const data = await res.json();
            if (data.players) {
                setPlayers(data.players);
            }
        } catch (error) {
            console.error("Failed to fetch most wanted:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMostWanted();
    }, [windowHours]);

    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    return (
        <Card className="card-glow border-red-900/30 bg-zinc-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm text-red-500 font-bold flex items-center gap-2">
                    🎯 Most Wanted
                </CardTitle>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 text-[10px] px-2 ${windowHours === 24 ? 'bg-red-900/20 text-red-400' : 'text-zinc-500'}`}
                        onClick={() => setWindowHours(24)}
                    >
                        24h
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 text-[10px] px-2 ${windowHours === 168 ? 'bg-red-900/20 text-red-400' : 'text-zinc-500'}`}
                        onClick={() => setWindowHours(168)}
                    >
                        7d
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {loading ? (
                    <div className="text-center text-zinc-500 text-xs py-4">Scanning threats...</div>
                ) : players.length === 0 ? (
                    <div className="text-center text-zinc-500 text-xs py-4">No threats detected yet.</div>
                ) : (
                    <div className="space-y-2">
                        {players.map((player) => (
                            <div key={player.address} className="bg-zinc-950/50 p-2 rounded border border-zinc-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-lg font-black text-zinc-600 w-4 text-center">#{player.rank}</div>
                                    <div>
                                        <div className="text-sm font-bold text-zinc-200">
                                            {player.handle ? `@${player.handle}` : formatAddress(player.address)}
                                        </div>
                                        <div className="text-[10px] text-zinc-500 flex gap-2">
                                            <span>⚔️ {player.normalRaidsInitiated}</span>
                                            <span>🔥 {player.highStakesRaidsInitiated}</span>
                                            <span>🛡️ {player.timesRaided}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-red-500 font-black">{player.threatScore}</div>
                                    <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Threat</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
