import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

interface CartelEvent {
    id: string;
    type: 'RAID' | 'HIGH_STAKES_RAID' | 'RETIRE';
    attacker?: string;
    target?: string;
    user?: string;
    stolenShares?: number;
    selfPenaltyShares?: number;
    payout?: number;
    timestamp: string;
    txHash: string;
}

export default function ActivityFeed() {
    const [events, setEvents] = useState<CartelEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/cartel/events?limit=20');
            const data = await res.json();
            if (data.events) {
                setEvents(data.events);
            }
        } catch (error) {
            console.error("Failed to fetch activity:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
        const interval = setInterval(fetchEvents, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const formatAddress = (addr?: string) => {
        if (!addr) return "Unknown";
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'HIGH_STAKES_RAID': return '🔥';
            case 'RETIRE': return '💀';
            default: return '⚔️';
        }
    };

    return (
        <Card className="card-glow border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm text-zinc-400 font-normal flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Activity
                </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto space-y-3 custom-scrollbar">
                {loading && events.length === 0 ? (
                    <div className="text-center text-zinc-500 text-xs py-4">Loading feed...</div>
                ) : events.length === 0 ? (
                    <div className="text-center text-zinc-500 text-xs py-4">No recent activity. Be the first!</div>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="text-xs border-b border-zinc-800/50 pb-2 last:border-0 last:pb-0 animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-lg mr-2">{getEventIcon(event.type)}</span>
                                <div className="flex-1">
                                    <p className="text-zinc-300 leading-tight">
                                        {event.type === 'RAID' && (
                                            <>
                                                <span className="text-blue-400 font-bold">{formatAddress(event.attacker)}</span> raided <span className="text-red-400">{formatAddress(event.target)}</span> and stole <span className="text-green-400 font-bold">{event.stolenShares} shares</span>.
                                            </>
                                        )}
                                        {event.type === 'HIGH_STAKES_RAID' && (
                                            <>
                                                <span className="text-red-500 font-bold">HIGH-STAKES:</span> <span className="text-blue-400 font-bold">{formatAddress(event.attacker)}</span> hit <span className="text-red-400">{formatAddress(event.target)}</span>! Stole <span className="text-green-400 font-bold">{event.stolenShares}</span>, burned <span className="text-orange-400">{event.selfPenaltyShares}</span>.
                                            </>
                                        )}
                                        {event.type === 'RETIRE' && (
                                            <>
                                                <span className="text-zinc-500 font-bold">{formatAddress(event.user)}</span> retired. Cashed out <span className="text-green-400 font-bold">${event.payout} USDC</span>.
                                            </>
                                        )}
                                    </p>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-[10px] text-zinc-600">
                                            {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                                        </span>
                                        <a
                                            href={`https://sepolia.basescan.org/tx/${event.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-zinc-700 hover:text-zinc-500 underline"
                                        >
                                            View Tx
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
