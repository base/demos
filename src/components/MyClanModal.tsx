import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClanSummary } from '@/lib/clan-service';
import { formatDistanceToNow } from 'date-fns';

interface MyClanModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: string;
}

export default function MyClanModal({ isOpen, onClose, address }: MyClanModalProps) {
    const [summary, setSummary] = useState<ClanSummary | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && address) {
            setLoading(true);
            fetch(`/api/cartel/invites/me?address=${address}`)
                .then(res => res.json())
                .then(data => {
                    setSummary(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch clan summary:", err);
                    setLoading(false);
                });
        }
    }, [isOpen, address]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0B0E12] border-zinc-800 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black heading-font text-neon-blue flex items-center gap-2">
                        🧬 My Clan
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="text-center py-8 text-zinc-500">Loading clan data...</div>
                ) : summary ? (
                    <div className="space-y-6">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-white">
                                        {summary.directInvitesUsed} <span className="text-zinc-500 text-sm">/ {summary.maxInvites}</span>
                                    </div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Invites Used</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-[#4A87FF]">
                                        {summary.totalClanMembers}
                                    </div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Clan Size</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-[#D4AF37]">
                                        {summary.clanTotalShares}
                                    </div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Clan Shares</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-red-500">
                                        {summary.clanRaidCount}
                                    </div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Clan Raids</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Direct Invitees List */}
                        <div>
                            <h3 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">Direct Recruits</h3>
                            {summary.directInvitees.length === 0 ? (
                                <div className="text-center py-8 bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
                                    <p className="text-zinc-500 mb-2">You haven't recruited anyone yet.</p>
                                    <Button variant="outline" className="border-[#4FF0E6] text-[#4FF0E6] hover:bg-[#4FF0E6]/10">
                                        Generate Invite
                                    </Button>
                                </div>
                            ) : (
                                <ScrollArea className="h-[300px] pr-4">
                                    <div className="space-y-2">
                                        {summary.directInvitees.map((member) => (
                                            <div key={member.address} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                                <div>
                                                    <div className="font-bold text-white">
                                                        {member.handle || `${member.address.slice(0, 6)}...${member.address.slice(-4)}`}
                                                    </div>
                                                    <div className="text-xs text-zinc-500">
                                                        Joined {formatDistanceToNow(new Date(member.joinedAt))} ago
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[#D4AF37] font-bold text-sm">
                                                        {member.shares} shares
                                                    </div>
                                                    <div className="text-xs text-zinc-500 flex items-center justify-end gap-2">
                                                        <span className="flex items-center gap-1">
                                                            ⚔️ {member.raidsBy}
                                                        </span>
                                                        {member.highStakesBy > 0 && (
                                                            <span className="flex items-center gap-1 text-red-400">
                                                                🔥 {member.highStakesBy}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </div>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}
