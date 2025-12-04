import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sdk } from "@farcaster/miniapp-sdk";
import PaymentModal from "./PaymentModal";
import { RAID_FEE, formatUSDC } from "@/lib/basePay";

interface RaidModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetName?: string;
}

export default function RaidModal({ isOpen, onClose, targetName = "Unknown Rival" }: RaidModalProps) {
    const [step, setStep] = useState<'confirm' | 'payment' | 'raiding' | 'result'>('confirm');
    const [result, setResult] = useState<'success' | 'fail'>('success');
    const [stolenAmount, setStolenAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleInitiateRaid = () => {
        setStep('payment');
    };

    const handleConfirmPayment = () => {
        setIsProcessing(true);
        setStep('raiding');

        // Simulate payment + raid logic
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // 70% success chance
            const amount = isSuccess ? Math.floor(Math.random() * 50) + 10 : 0;

            setResult(isSuccess ? 'success' : 'fail');
            setStolenAmount(amount);
            setStep('result');
            setIsProcessing(false);
        }, 3000);
    };

    const handleShare = () => {
        const text = result === 'success'
            ? `I just raided ${targetName} and stole ${stolenAmount} shares in Base Cartel! 🏴‍☠️`
            : `I tried to raid ${targetName} in Base Cartel but got fought off! 🛡️`;

        sdk.actions.composeCast({
            text: text,
            embeds: []
        });
        onClose();
    };

    const handleCloseModal = () => {
        setStep('confirm');
        setIsProcessing(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-center text-red-500">
                        {step === 'confirm' && "Prepare for Raid"}
                        {step === 'payment' && "Confirm Payment"}
                        {step === 'raiding' && "Raiding..."}
                        {step === 'result' && (result === 'success' ? "Raid Successful!" : "Raid Failed")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === 'confirm' && (
                        <>
                            <p className="text-center text-zinc-300">
                                Are you sure you want to raid <span className="font-bold text-white">{targetName}</span>?
                            </p>
                            <div className="bg-zinc-950 p-3 rounded-lg text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Raid Cost</span>
                                    <span className="text-green-400 font-bold">{formatUSDC(RAID_FEE)} USDC</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={handleCloseModal} className="flex-1">Cancel</Button>
                                <Button onClick={handleInitiateRaid} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                                    ⚔️ Attack
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 'raiding' && (
                        <div className="flex flex-col items-center py-4">
                            <div className="animate-spin text-4xl mb-4">⚔️</div>
                            <p className="text-zinc-400">Infiltrating hideout...</p>
                        </div>
                    )}

                    {step === 'result' && (
                        <div className="text-center space-y-4">
                            <div className="text-5xl">
                                {result === 'success' ? "💰" : "💀"}
                            </div>
                            {result === 'success' ? (
                                <p className="text-green-400 font-bold text-lg">
                                    You stole {stolenAmount} shares!
                                </p>
                            ) : (
                                <p className="text-red-400 font-bold">
                                    Your squad was wiped out.
                                </p>
                            )}
                            <Button onClick={handleShare} className="w-full">
                                Share Replay
                            </Button>
                            <Button variant="ghost" onClick={handleCloseModal} className="w-full">
                                Close
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <PaymentModal
                isOpen={step === 'payment'}
                amount={formatUSDC(RAID_FEE)}
                action={`Raid ${targetName}`}
                onConfirm={handleConfirmPayment}
                onCancel={() => setStep('confirm')}
                isProcessing={isProcessing}
            />
        </div>
    );
}

