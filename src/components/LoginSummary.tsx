import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';

interface LoginSummaryProps {
    address: string;
}

interface SummaryData {
    raidsOnYou: number;
    raidsByYou: number;
    highStakesByYou: number;
    retired: boolean;
    notableEvents: any[];
    since: string;
}

export default function LoginSummary({ address }: LoginSummaryProps) {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!address) return;

        const fetchSummary = async () => {
            try {
                const res = await fetch(`/api/cartel/me/summary?address=${address}`);
                const data = await res.json();

                // Check for meaningful activity
                const hasActivity =
                    data.raidsOnYou > 0 ||
                    data.raidsByYou > 0 ||
                    data.highStakesByYou > 0 ||
                    data.retired;

                if (hasActivity) {
                    setSummary(data);
                    setIsVisible(true);
                }
            } catch (error) {
                console.error("Failed to fetch summary:", error);
            }
        };

        // Only fetch once per session (could use sessionStorage to enforce strictly)
        const hasSeen = sessionStorage.getItem(`summary_seen_${address}`);
        if (!hasSeen) {
            fetchSummary();
        }

    }, [address]);

    const handleClose = () => {
        setIsVisible(false);
        if (address) {
            sessionStorage.setItem(`summary_seen_${address}`, 'true');
        }
    };

    if (!isVisible || !summary) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <Card className="w-full max-w-sm card-glow border-zinc-700 bg-zinc-900">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white heading-font">While you were away...</CardTitle>
                    <p className="text-xs text-zinc-500">
                        Since {formatDistanceToNow(new Date(summary.since))} ago
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-zinc-300">
                        {summary.raidsOnYou > 0 && (
                            <li className="flex items-center gap-2">
                                <span className="text-red-500">🛡️</span>
                                <span>You were raided <span className="font-bold text-white">{summary.raidsOnYou}</span> times.</span>
                            </li>
                        )}
                        {summary.raidsByYou > 0 && (
                            <li className="flex items-center gap-2">
                                <span className="text-blue-400">⚔️</span>
                                <span>You executed <span className="font-bold text-white">{summary.raidsByYou}</span> raids.</span>
                            </li>
                        )}
                        {summary.highStakesByYou > 0 && (
                            <li className="flex items-center gap-2">
                                <span className="text-orange-500">🔥</span>
                                <span>You went high-stakes <span className="font-bold text-white">{summary.highStakesByYou}</span> times.</span>
                            </li>
                        )}
                        {summary.retired && (
                            <li className="flex items-center gap-2">
                                <span className="text-zinc-500">💀</span>
                                <span>You retired from the cartel.</span>
                            </li>
                        )}
                    </ul>

                    {summary.notableEvents.length > 0 && (
                        <div className="bg-zinc-950/50 p-3 rounded border border-zinc-800/50">
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-2">Highlights</p>
                            <div className="space-y-2">
                                {summary.notableEvents.map((ev: any, i: number) => (
                                    <div key={i} className="text-xs text-zinc-400">
                                        {ev.type === 'HIGH_STAKES_RAID' && ev.direction === 'byYou' && (
                                            <span>🔥 You hit <span className="text-white">{ev.otherPartyHandle.slice(0, 6)}...</span> for <span className="text-green-400">{ev.stolenShares} shares</span>!</span>
                                        )}
                                        {ev.type === 'RAID' && ev.direction === 'onYou' && (
                                            <span>🛡️ <span className="text-white">{ev.otherPartyHandle.slice(0, 6)}...</span> stole <span className="text-red-400">{ev.stolenShares} shares</span> from you.</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button
                        className="w-full bg-white text-black hover:bg-zinc-200 font-bold"
                        onClick={handleClose}
                    >
                        Got it
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
