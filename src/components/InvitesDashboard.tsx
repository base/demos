import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAccount } from 'wagmi';

interface Invite {
    code: string;
    status: 'unused' | 'used' | 'expired';
    type: string;
    usedBy?: {
        walletAddress: string;
        farcasterId?: string;
    };
    usedAt?: string;
}

interface Referral {
    id: string;
    referee: {
        walletAddress: string;
        farcasterId?: string;
    };
    joinedAt: string;
    totalFeesPaid: number;
    totalProfitEarned: number;
    referralPoints: number;
}

interface ReferralStats {
    referralPointsTotal: number;
    referralRewardsClaimable: number;
    referralRewardsClaimed: number;
    stats: {
        totalReferees: number;
        totalFeesPaidByReferees: number;
        totalProfitEarnedByReferees: number;
    };
}

export default function InvitesDashboard() {
    const { address } = useAccount();
    const [invites, setInvites] = useState<Invite[]>([]);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [stats, setStats] = useState<ReferralStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    useEffect(() => {
        if (address) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [invitesRes, referralsRes, statsRes] = await Promise.all([
                fetch(`/api/me/invites?walletAddress=${address}`),
                fetch(`/api/me/referrals?walletAddress=${address}`),
                fetch(`/api/me/referrals/stats?walletAddress=${address}`)
            ]);

            if (invitesRes.ok) {
                const data = await invitesRes.json();
                setInvites(data.invites || []);
            }

            if (referralsRes.ok) {
                const data = await referralsRes.json();
                setReferrals(data.referrals || []);
            }

            if (statsRes.ok) {
                const data = await statsRes.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch invite data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleShare = (code: string) => {
        const text = `I've got an invite to Base Cartel. Use code ${code} to enter.`;
        try {
            sdk.actions.composeCast({
                text: text,
                embeds: []
            });
        } catch {
            // Fallback for web
            window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`, '_blank');
        }
    };

    if (isLoading) {
        return (
            <div className="p-4 space-y-4 animate-pulse">
                <div className="h-32 bg-[#1B1F26] rounded-xl"></div>
                <div className="h-64 bg-[#1B1F26] rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black heading-font text-neon-blue">YOUR INVITES</h1>
                <p className="text-zinc-400 text-sm">
                    You hold the keys to the cartel. Share these codes wisely.
                </p>
            </div>

            {/* Referral Stats Card */}
            {stats && (
                <Card className="card-glow border-[#D4AF37]/40 bg-[#1B1F26]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-zinc-400 font-medium uppercase tracking-wider">Referral Power</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-4xl font-black text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                                    {stats.referralPointsTotal.toFixed(1)}
                                </div>
                                <p className="text-xs text-zinc-500 mt-1">POINTS EARNED</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-white">
                                    ${stats.stats.totalFeesPaidByReferees.toFixed(2)}
                                </div>
                                <p className="text-xs text-zinc-500">FEES GENERATED</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-zinc-400">
                            <span>Recruits: <span className="text-white font-bold">{stats.stats.totalReferees}</span></span>
                            <span>Profit Share: <span className="text-[#3DFF72] font-bold">${stats.stats.totalProfitEarnedByReferees.toFixed(2)}</span></span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Invites List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white pl-1 border-l-4 border-[#4A87FF]">
                    ACTIVE CODES
                </h2>

                {invites.length === 0 ? (
                    <Card className="bg-[#1B1F26] border-[#4A87FF]/20">
                        <CardContent className="p-6 text-center text-zinc-500">
                            Your invites will be available after your account is fully activated.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {invites.map((invite) => (
                            <Card key={invite.code} className={`bg-[#1B1F26] border transition-all ${invite.status === 'unused' ? 'border-[#4A87FF]/30 shadow-lg shadow-blue-900/10' : 'border-zinc-800 opacity-75'}`}>
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-mono text-xl font-bold text-white tracking-wider">
                                                {invite.code}
                                            </div>
                                            <div className="mt-1">
                                                {invite.status === 'unused' ? (
                                                    <span className="text-xs font-bold bg-[#4A87FF]/20 text-[#4A87FF] px-2 py-1 rounded">UNUSED</span>
                                                ) : (
                                                    <span className="text-xs font-bold bg-zinc-800 text-zinc-500 px-2 py-1 rounded">USED</span>
                                                )}
                                            </div>
                                        </div>
                                        {invite.status === 'unused' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-[#4A87FF]/30 hover:bg-[#4A87FF]/10 text-[#4A87FF]"
                                                onClick={() => handleCopy(invite.code)}
                                            >
                                                {copiedCode === invite.code ? "COPIED" : "COPY"}
                                            </Button>
                                        )}
                                    </div>

                                    {invite.status === 'unused' ? (
                                        <Button
                                            className="w-full bg-gradient-to-r from-[#4A87FF] to-[#4FF0E6] text-black font-bold hover:opacity-90"
                                            onClick={() => handleShare(invite.code)}
                                        >
                                            Share on Farcaster
                                        </Button>
                                    ) : (
                                        <div className="text-xs text-zinc-500 bg-black/20 p-3 rounded border border-zinc-800">
                                            <div className="flex justify-between">
                                                <span>Used by:</span>
                                                <span className="text-zinc-300 font-mono">
                                                    {invite.usedBy?.walletAddress.slice(0, 6)}...{invite.usedBy?.walletAddress.slice(-4)}
                                                </span>
                                            </div>
                                            {invite.usedAt && (
                                                <div className="flex justify-between mt-1">
                                                    <span>Date:</span>
                                                    <span>{new Date(invite.usedAt).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Referrals List */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <h2 className="text-xl font-bold text-white pl-1 border-l-4 border-[#4FF0E6]">
                        YOUR RECRUITS
                    </h2>
                    <span className="text-[#4FF0E6] font-mono text-sm">{referrals.length} RECRUITS</span>
                </div>

                <Card className="bg-[#1B1F26] border-[#4A87FF]/20 overflow-hidden">
                    <div className="divide-y divide-zinc-800">
                        {referrals.length === 0 ? (
                            <div className="p-8 text-center space-y-2">
                                <p className="text-zinc-400 font-medium">No recruits yet</p>
                                <p className="text-zinc-600 text-sm">Share your invite codes to build your own crew.</p>
                            </div>
                        ) : (
                            referrals.map((ref) => (
                                <div key={ref.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A87FF] to-[#4FF0E6] flex items-center justify-center text-black font-bold">
                                            {ref.referee.farcasterId ? "F" : "0x"}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">
                                                {ref.referee.walletAddress.slice(0, 6)}...{ref.referee.walletAddress.slice(-4)}
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                Joined {new Date(ref.joinedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#D4AF37] font-bold text-sm">
                                            {ref.referralPoints.toFixed(1)} PTS
                                        </div>
                                        <div className="text-[10px] text-zinc-500">
                                            ${ref.totalFeesPaid.toFixed(2)} Fees
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
