import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useComposeCast } from "@coinbase/onchainkit/minikit";

interface BetrayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BetrayModal({ isOpen, onClose }: BetrayModalProps) {
    const [step, setStep] = useState<'warn' | 'confirm' | 'betraying' | 'result'>('warn');
    const [payout, setPayout] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { composeCast } = useComposeCast() as any;

    if (!isOpen) return null;

    const handleBetray = () => {
        setStep('betraying');

        // Simulate betrayal logic
        setTimeout(() => {
            const amount = Math.floor(Math.random() * 1000) + 500;
            setPayout(amount);
            setStep('result');
        }, 3000);
    };

    const handleShare = () => {
        composeCast({
            text: `I just BETRAYED the Base Cartel and ran away with ${payout} USDC! 🏃💨\n\nTrust no one.`,
            embeds: []
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-red-950/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-sm bg-black border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                <CardHeader>
                    <CardTitle className="text-center text-red-500 text-2xl font-black uppercase tracking-widest animate-pulse">
                        {step === 'warn' && "⚠️ WARNING ⚠️"}
                        {step === 'confirm' && "FINAL CHANCE"}
                        {step === 'betraying' && "BETRAYING..."}
                        {step === 'result' && "TRAITOR"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {step === 'warn' && (
                        <>
                            <p className="text-center text-red-200 font-mono">
                                You are about to betray the Cartel. This action is <span className="font-bold underline">IRREVERSIBLE</span>.
                            </p>
                            <p className="text-center text-red-400 text-sm">
                                You will burn ALL your shares and reputation to steal a portion of the pot.
                            </p>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={onClose} className="flex-1 border-zinc-700">Cancel</Button>
                                <Button onClick={() => setStep('confirm')} className="flex-1 bg-red-900 hover:bg-red-800 text-white border border-red-500">
                                    I understand
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 'confirm' && (
                        <>
                            <p className="text-center text-white font-bold text-lg">
                                Are you absolutely sure?
                            </p>
                            <p className="text-center text-zinc-400 text-xs">
                                Your name will be permanently marked as a Traitor.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={handleBetray}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 text-xl animate-bounce"
                                >
                                    🔴 EXECUTE BETRAYAL
                                </Button>
                                <Button variant="ghost" onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
                                    Abort Mission
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 'betraying' && (
                        <div className="flex flex-col items-center py-8">
                            <div className="text-6xl mb-4 animate-spin">☠️</div>
                            <p className="text-red-500 font-mono animate-pulse">Burning shares...</p>
                            <p className="text-red-500 font-mono animate-pulse delay-75">Draining pot...</p>
                        </div>
                    )}

                    {step === 'result' && (
                        <div className="text-center space-y-6">
                            <div className="text-6xl">💸</div>
                            <div>
                                <p className="text-zinc-400">You escaped with</p>
                                <p className="text-green-500 font-black text-4xl">${payout}</p>
                            </div>
                            <p className="text-red-500 text-xs font-mono">
                                You are now exiled from the Cartel.
                            </p>
                            <Button onClick={handleShare} className="w-full bg-white text-black hover:bg-zinc-200">
                                Broadcast Your Crime
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
