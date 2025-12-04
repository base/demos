import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentModalProps {
    isOpen: boolean;
    amount: string;
    action: string;
    onConfirm: () => void;
    onCancel: () => void;
    isProcessing?: boolean;
}

export default function PaymentModal({
    isOpen,
    amount,
    action,
    onConfirm,
    onCancel,
    isProcessing = false
}: PaymentModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm bg-zinc-900 border-zinc-700">
                <CardHeader>
                    <CardTitle className="text-center text-white">
                        {isProcessing ? "Processing..." : "Confirm Payment"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!isProcessing ? (
                        <>
                            <div className="text-center space-y-2">
                                <p className="text-zinc-400 text-sm">You are about to</p>
                                <p className="text-white font-bold text-lg">{action}</p>
                            </div>

                            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Amount</span>
                                    <span className="text-green-400 font-bold text-xl">{amount} USDC</span>
                                </div>
                                <div className="flex justify-between items-center mt-2 text-sm">
                                    <span className="text-zinc-500">Gas fees</span>
                                    <span className="text-purple-400">Sponsored ✨</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={onCancel}
                                    variant="outline"
                                    className="flex-1"
                                    disabled={isProcessing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onConfirm}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    disabled={isProcessing}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center py-8">
                            <div className="animate-spin text-4xl mb-4">💸</div>
                            <p className="text-zinc-400">Processing transaction...</p>
                            <p className="text-xs text-zinc-600 mt-2">Gas fees sponsored by Paymaster</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
