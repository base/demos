import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { truncateAddress } from '@/lib/truncateAddress';

interface RaidEvent {
    id: string;
    type: 'RAID' | 'HIGH_STAKES_RAID';
    direction: 'by' | 'on';
    timestamp: string;
    txHash: string;
    attacker: string;
    target: string;
    stolenShares: number;
    selfPenaltyShares?: number;
    feePaid: number;
}

interface RaidHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: string;
}

export default function RaidHistoryModal({ isOpen, onClose, address }: RaidHistoryModalProps) {
    const [events, setEvents] = useState<RaidEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [direction, setDirection] = useState('all');
    const [type, setType] = useState('all');
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchEvents = async (reset = false) => {
        if (!address) return;
        setLoading(true);
        const currentOffset = reset ? 0 : offset;

        try {
            const res = await fetch(`/api/cartel/history/raids?address=${address}&direction=${direction}&type=${type}&offset=${currentOffset}&limit=20`);
            const data = await res.json();

            if (data.events) {
                if (reset) {
                    setEvents(data.events);
                } else {
                    setEvents(prev => [...prev, ...data.events]);
                }
                setHasMore(data.events.length === 20);
                setOffset(currentOffset + 20);
            }
        } catch (err) {
            console.error("Failed to fetch raid history:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchEvents(true);
        }
    }, [isOpen, address, direction, type]);

    const handleLoadMore = () => {
        fetchEvents(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0B0E12] border-zinc-800 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black heading-font text-zinc-200 flex items-center gap-2">
                        📜 Raid History
                    </DialogTitle>
                </DialogHeader>

                {/* Filters */}
                <div className="flex gap-2 mb-4">
                    <Select value={direction} onValueChange={setDirection}>
                        <SelectTrigger className="w-[120px] bg-zinc-900 border-zinc-700 text-xs h-8">
                            <SelectValue placeholder="Direction" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                            <SelectItem value="all">All Activity</SelectItem>
                            <SelectItem value="by">Attacks By Me</SelectItem>
                            <SelectItem value="on">Attacks On Me</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-[120px] bg-zinc-900 border-zinc-700 text-xs h-8">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="normal">Normal Raids</SelectItem>
                            <SelectItem value="highstakes">High-Stakes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* List */}
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                        {events.length === 0 && !loading ? (
                            <div className="text-center py-8 text-zinc-500">
                                No raids found.
                            </div>
                        ) : (
                            events.map((event) => (
                                <div key={event.id} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="text-2xl mt-1">
                                            {event.type === 'HIGH_STAKES_RAID' ? '🔥' : '⚔️'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-zinc-200 leading-snug">
                                                {event.direction === 'by' ? (
                                                    <>
                                                        You raided <span className="font-bold text-zinc-400">{truncateAddress(event.target)}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="font-bold text-zinc-400">{truncateAddress(event.attacker)}</span> raided you
                                                    </>
                                                )}
                                                {event.type === 'HIGH_STAKES_RAID' && <span className="text-red-500 font-bold text-xs ml-1">HIGH STAKES</span>}
                                            </p>

                                            <div className="mt-1 text-xs space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <span className={event.direction === 'by' ? "text-green-400" : "text-red-400"}>
                                                        {event.direction === 'by' ? '+' : '-'}{event.stolenShares.toFixed(0)} shares
                                                    </span>
                                                    {event.selfPenaltyShares && event.selfPenaltyShares > 0 && (
                                                        <span className="text-red-500">
                                                            (-{event.selfPenaltyShares.toFixed(0)} burned)
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-zinc-600 flex justify-between items-center">
                                                    <span>{formatDistanceToNow(new Date(event.timestamp))} ago</span>
                                                    <a
                                                        href={`https://basescan.org/tx/${event.txHash}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        View Tx
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && <div className="text-center py-2 text-zinc-500 text-xs">Loading...</div>}
                        {!loading && hasMore && (
                            <Button
                                variant="ghost"
                                className="w-full text-xs text-zinc-500 hover:text-zinc-300"
                                onClick={handleLoadMore}
                            >
                                Load More
                            </Button>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
