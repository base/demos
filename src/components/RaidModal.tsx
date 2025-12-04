import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sdk } from "@farcaster/miniapp-sdk";
import PaymentModal from "./PaymentModal";
import { RAID_FEE, HIGH_STAKES_RAID_FEE, formatUSDC } from "@/lib/basePay";

interface RaidModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetName?: string;
}

export default function RaidModal({ isOpen, onClose, targetName = "Unknown Rival" }: RaidModalProps) {
    const [step, setStep] = useState<'confirm' | 'high-stakes-warning' | 'payment' | 'raiding' | 'result'>('confirm');
    const [raidType, setRaidType] = useState<'normal' | 'high-stakes'>('normal');
    const [result, setResult] = useState<'success' | 'fail'>('success');
    const [stolenAmount, setStolenAmount] = useState(0);
    const [selfPenalty, setSelfPenalty] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    if (!isOpen) return null;

    const handleInitiateRaid = () => {
        if (raidType === 'high-stakes') {
            setStep('high-stakes-warning');
        } else {
            setStep('payment');
        }
    };

    const handleConfirmHighStakes = () => {
        setStep('payment');
    };

    const handleConfirmPayment = () => {
        setIsProcessing(true);
        setStep('raiding');

        // Simulate payment + raid logic
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // 70% success chance

            let amount = 0;
            let penalty = 0;

            if (isSuccess) {
                if (raidType === 'normal') {
                    amount = Math.floor(Math.random() * 50) + 10;
                } else {
                    amount = Math.floor(Math.random() * 150) + 50; // Higher reward
                    penalty = Math.floor(Math.random() * 10); // Self penalty
                    setShowFlash(true);
                    setTimeout(() => setShowFlash(false), 1500);
                }
            }

            setResult(isSuccess ? 'success' : 'fail');
            setStolenAmount(amount);
            setSelfPenalty(penalty);
            setStep('result');
            setIsProcessing(false);
        }, 3000);
    };

    const handleShare = () => {
        const gameUrl = "https://basecartel.in"; // Or window.location.origin
        let text = "";

        if (raidType === 'normal') {
            text = `I just raided @${targetName} and stole ${stolenAmount} shares in Base Cartel on Base ⚡\n\nCome at me: ${gameUrl}`;
        } else {
            text = `🔥 High-Stakes Raid success!\nI hit @${targetName}, stole ${stolenAmount} shares and burned ${selfPenalty} of my own in Base Cartel.\n\nDare to try? ${gameUrl}`;
        }

        const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
        window.open(shareUrl, "_blank");
    };

    const handleCloseModal = () => {
        setStep('confirm');
        setRaidType('normal'); // Reset type
        setIsProcessing(false);
        onClose();
    };

    const currentFee = raidType === 'normal' ? RAID_FEE : HIGH_STAKES_RAID_FEE;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            {/* High-Stakes Flash Effect */}
            {showFlash && (
                <div className="fixed inset-0 z-[60] pointer-events-none animate-flash bg-gradient-to-br from-red-500/20 to-orange-500/20 mix-blend-overlay" />
            )}

            <Card className={`w-full max-w-sm bg-zinc-900 border-zinc-800 transition-all duration-500 ${raidType === 'high-stakes' ? 'shadow-[0_0_50px_-12px_rgba(220,38,38,0.5)] border-red-900/50' : ''}`}>
                <CardHeader>
                    <CardTitle className={`text-center ${raidType === 'high-stakes' ? 'text-red-500 animate-pulse' : 'text-zinc-200'}`}>
                        {step === 'confirm' && "Prepare for Raid"}
                        {step === 'high-stakes-warning' && "⚠️ HIGH STAKES WARNING"}
                        {step === 'payment' && "Confirm Payment"}
                        {step === 'raiding' && "Raiding..."}
                        {step === 'result' && (
                            raidType === 'high-stakes'
                                ? (result === 'success' ? "High-Stakes Raid Successful 🔥" : "Raid Failed")
                                : (result === 'success' ? "Raid Successful" : "Raid Failed")
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === 'confirm' && (
                        <>
                            <p className="text-center text-zinc-300">
                                Target: <span className="font-bold text-white">{targetName}</span>
                            </p>

                            {/* Raid Type Toggle */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setRaidType('normal')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${raidType === 'normal'
                                        ? 'bg-zinc-800 border-zinc-600 text-white'
                                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-700'
                                        }`}
                                >
                                    <span className="font-bold text-sm">Normal Raid</span>
                                    <span className="text-[10px] opacity-70 mt-1">Low risk • Standard fee</span>
                                </button>
                                <button
                                    onClick={() => setRaidType('high-stakes')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${raidType === 'high-stakes'
                                        ? 'bg-gradient-to-br from-red-950 to-orange-950 border-red-500 text-red-100 shadow-lg shadow-red-900/20'
                                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-red-900/50 hover:text-red-900'
                                        }`}
                                >
                                    <span className="font-bold text-sm">High-Stakes 🔥</span>
                                    <span className="text-[10px] opacity-70 mt-1">High risk • Burn shares</span>
                                </button>
                            </div>

                            <div className="bg-zinc-950 p-3 rounded-lg text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Raid Cost</span>
                                    <span className="text-green-400 font-bold">{formatUSDC(currentFee)} USDC</span>
                                </div>
                                {raidType === 'high-stakes' && (
                                    <div className="flex justify-between text-xs">
                                        <span className="text-red-400">Risk</span>
                                        <span className="text-red-400 font-bold">Self-Burn Penalty Possible</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={handleCloseModal} className="flex-1">Cancel</Button>
                                <Button
                                    onClick={handleInitiateRaid}
                                    className={`flex-1 text-white font-bold transition-all ${raidType === 'high-stakes'
                                        ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-900/40 animate-pulse-slow'
                                        : 'bg-zinc-700 hover:bg-zinc-600'
                                        }`}
                                >
                                    {raidType === 'high-stakes' ? '🔥 High-Stakes Raid' : '⚔️ Raid'}
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 'high-stakes-warning' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-red-950/50 border border-red-900/50 p-4 rounded-lg space-y-3">
                                <p className="text-sm text-red-200 leading-relaxed">
                                    You are about to launch a <span className="font-bold text-red-400">High-Stakes Raid</span> on <span className="font-bold text-white">@{targetName}</span>.
                                </p>
                                <div className="space-y-2 text-xs text-red-300/80">
                                    <div className="flex justify-between">
                                        <span>Potential Reward:</span>
                                        <span className="text-green-400 font-bold">~20% of their shares</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Raid Fee:</span>
                                        <span className="text-white font-bold">{formatUSDC(currentFee)} USDC</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Self Penalty:</span>
                                        <span className="text-red-400 font-bold">You burn ~3% of your own</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="ghost" onClick={() => setStep('confirm')} className="flex-1">Back</Button>
                                <Button
                                    onClick={handleConfirmHighStakes}
                                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-900/50"
                                >
                                    Confirm High-Stakes 🔥
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 'raiding' && (
                        <div className="flex flex-col items-center py-8">
                            <div className={`text-5xl mb-4 ${raidType === 'high-stakes' ? 'animate-bounce' : 'animate-spin'}`}>
                                {raidType === 'high-stakes' ? '🔥' : '⚔️'}
                            </div>
                            <p className="text-zinc-400 animate-pulse">
                                {raidType === 'high-stakes' ? 'Scorching the earth...' : 'Infiltrating hideout...'}
                            </p>
                        </div>
                    )}

                    {step === 'result' && (
                        <div className="text-center space-y-4">
                            <div className="text-6xl animate-in zoom-in duration-300">
                                {result === 'success' ? (raidType === 'high-stakes' ? "🔥" : "💰") : "💀"}
                            </div>
                            {result === 'success' ? (
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-zinc-300">
                                            You hit <span className="font-bold text-white">@{targetName}</span> hard.
                                        </p>
                                        {raidType === 'high-stakes' && (
                                            <p className="text-xs text-orange-400 font-medium tracking-widest uppercase">Reputation forged in fire</p>
                                        )}
                                    </div>

                                    <div className={`p-4 rounded-lg space-y-2 ${raidType === 'high-stakes' ? 'bg-gradient-to-br from-red-950/50 to-orange-950/50 border border-red-900/30' : 'bg-zinc-950'}`}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400">Stolen Shares</span>
                                            <span className="text-green-400 font-bold text-xl">+{stolenAmount}</span>
                                        </div>
                                        {raidType === 'high-stakes' && selfPenalty > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-zinc-400">Self-Burned</span>
                                                <span className="text-red-400 font-bold">-{selfPenalty}</span>
                                            </div>
                                        )}
                                        {raidType === 'high-stakes' && (
                                            <div className="flex justify-between items-center pt-2 border-t border-red-900/30 mt-2">
                                                <span className="text-zinc-300 font-bold">Net Gain</span>
                                                <span className="text-orange-400 font-bold">+{stolenAmount - selfPenalty}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-red-400 font-bold">
                                    Your squad was wiped out.
                                </p>
                            )}

                            {result === 'success' && (
                                <Button onClick={handleShare} className="w-full bg-[#855DCD] hover:bg-[#724BB7] text-white font-bold">
                                    Share on Farcaster
                                </Button>
                            )}

                            <Button variant="ghost" onClick={handleCloseModal} className="w-full">
                                Close
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <PaymentModal
                isOpen={step === 'payment'}
                amount={formatUSDC(currentFee)}
                action={raidType === 'high-stakes' ? `High-Stakes Raid ${targetName}` : `Raid ${targetName}`}
                onConfirm={handleConfirmPayment}
                onCancel={() => setStep('confirm')}
                isProcessing={isProcessing}
            />
        </div>
    );
}

