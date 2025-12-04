import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PaymentModal from "./PaymentModal";
import { JOIN_FEE, formatUSDC } from "@/lib/basePay";
import { useAccount, useConnect } from 'wagmi';
import { useFrameContext } from "./providers/FrameProvider";
// Removed unused Avatar import

interface JoinCartelProps {
    onJoin: (inviteCode: string) => void;
}

export default function JoinCartel({ onJoin }: JoinCartelProps) {
    const { isConnected, address } = useAccount();
    const { connect, connectors } = useConnect();
    const frameContext = useFrameContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { context, isInMiniApp } = (frameContext || {}) as any;

    const [inviteCode, setInviteCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Removed unused writeContract
    // const { writeContract, data: hash } = useWriteContract();
    // Assuming hash was used in useWaitForTransactionReceipt, we need to check if it's actually used.
    // Looking at the original code, useWaitForTransactionReceipt was using `hash`. 
    // If writeContract is removed, hash is gone. 
    // But wait, the component logic relies on `isConfirmed` from `useWaitForTransactionReceipt`.
    // However, the new logic uses `fetch` to `/api/auth/join-with-invite` and does NOT use `writeContract` anymore.
    // So `useWaitForTransactionReceipt` might also be unused if we are not sending a transaction on chain directly here.
    // Let's check the handleConfirmPayment logic again.
    // It calls `fetch`, then sets `isConfirmed` logic manually via state? No, it sets `setIsProcessing(false)` and `setShowPayment(false)`.
    // The `useEffect` listening to `isConfirmed` is likely dead code now if we aren't using `writeContract`.

    // Let's remove the dead hook usage entirely.

    // Auto-connect if in MiniApp
    useEffect(() => {
        if (isInMiniApp && !isConnected) {
            const farcasterConnector = connectors.find(c => c.id === 'farcaster-miniapp');
            if (farcasterConnector) {
                connect({ connector: farcasterConnector });
            }
        }
    }, [isInMiniApp, isConnected, connectors, connect]);

    // Removed dead useEffect for transaction receipt as we use API now

    const handleJoinClick = () => {
        if (!inviteCode) {
            alert("Invite code required for Phase 1!");
            return;
        }
        // Validate format (simple check)
        if (!inviteCode.startsWith("BASE-")) {
            alert("Invalid invite code! Must start with BASE-");
            return;
        }
        setShowPayment(true);
    };

    const handleConfirmPayment = async () => {
        setIsProcessing(true);

        try {
            const response = await fetch('/api/auth/join-with-invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress: address,
                    farcasterId: context?.user?.fid,
                    inviteCode: inviteCode
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // If user already exists, just proceed to dashboard
                if (data.error === 'User already exists') {
                    console.log("User already exists, proceeding to dashboard...");
                } else {
                    throw new Error(data.error || 'Failed to join');
                }
            }

            // Success
            setIsProcessing(false);
            setShowPayment(false);
            setIsLoading(true);

            // Store new invites in local storage or state if needed, 
            // but for now just proceed to dashboard
            setTimeout(() => {
                onJoin(inviteCode);
            }, 1000);

        } catch (error) {
            console.error("Join failed:", error);
            setIsProcessing(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            alert("Failed to join: " + (error as any).message);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E12] text-white flex items-center justify-center p-4">
            <Card className="w-full max-w-[400px] bg-[#1B1F26] border-[#4A87FF]/30 shadow-2xl">
                <CardHeader className="text-center pb-8 pt-8">
                    <div className="mb-6">
                        <div className="text-6xl mb-4">🎩</div>
                        <CardTitle className="text-4xl font-black heading-font text-neon-blue mb-2">
                            ENTER THE CARTEL
                        </CardTitle>
                        <p className="text-sm text-[#D4AF37] font-medium tracking-wider">
                            INVITE-ONLY ACCESS
                        </p>
                    </div>
                    {isInMiniApp && context?.user && (
                        <div className="flex flex-col items-center gap-2 mt-4 animate-fade-in">
                            {context.user.pfpUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={context.user.pfpUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-[#4A87FF] glow-blue" />
                            )}
                            <p className="text-zinc-300 font-medium">
                                Welcome, <span className="text-[#4A87FF]">@{context.user.username}</span>
                            </p>
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-8">
                    <p className="text-center text-zinc-400 text-sm leading-relaxed">
                        Base Cartel is invite-only during this phase. Enter your code to get in.
                    </p>

                    <div className="card-glow p-5 rounded-xl space-y-3">
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-zinc-400">Entry Fee</span>
                            <span className="text-[#3DFF72] font-bold text-lg">FREE</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#4A87FF]/20 to-transparent"></div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-zinc-400">Initial Shares</span>
                            <span className="text-white font-bold text-lg">100</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#4A87FF]/20 to-transparent"></div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-zinc-400">Profit Share</span>
                            <span className="text-[#4FF0E6] font-bold">Enabled ✓</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#4A87FF]/20 to-transparent"></div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-zinc-400">Gas Fees</span>
                            <span className="text-[#4FF0E6] font-bold">Sponsored ✨</span>
                        </div>
                    </div>

                    {!isConnected ? (
                        <div className="space-y-4">
                            <p className="text-center text-sm text-zinc-400">
                                {isInMiniApp ? "Connecting to your account..." : "Connect your wallet to verify eligibility."}
                            </p>
                            {!isInMiniApp && (
                                <Button
                                    className="w-full bg-[#4A87FF] hover:bg-[#5A97FF] text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                    onClick={() => {
                                        const connector = connectors.find(c => c.id === 'coinbaseWalletSDK');
                                        if (connector) {
                                            connect({ connector });
                                        } else {
                                            // Fallback to first available if coinbase not found
                                            const first = connectors[0];
                                            if (first) connect({ connector: first });
                                        }
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                                        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                                        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                                    </svg>
                                    Connect Wallet
                                </Button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400 font-medium">Invite Code (Required)</label>
                                <input
                                    type="text"
                                    placeholder="BASE-XXXXXX"
                                    className="w-full bg-[#0B0E12] border-2 border-[#4A87FF]/30 rounded-lg p-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#4A87FF] focus:glow-blue transition-all"
                                    value={inviteCode}
                                    onChange={(e) => setInviteCode(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full bg-gradient-to-r from-[#4A87FF] to-[#4FF0E6] hover:from-[#5A97FF] hover:to-[#5FFFF6] text-white font-bold py-6 text-lg rounded-lg glow-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleJoinClick}
                                disabled={isLoading || !inviteCode}
                            >
                                {isLoading ? "Joining..." : "Join the Cartel"}
                            </Button>
                        </>
                    )}

                    <p className="text-center text-xs text-zinc-600 mt-4">
                        Phase 1: Invite-Only Access
                    </p>
                </CardContent>
            </Card>

            <PaymentModal
                isOpen={showPayment}
                amount={formatUSDC(JOIN_FEE)}
                action="Join the Cartel"
                onConfirm={handleConfirmPayment}
                onCancel={() => setShowPayment(false)}
                isProcessing={isProcessing}
            />
        </div>
    );
}
