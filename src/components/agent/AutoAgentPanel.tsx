import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useSignTypedData } from 'wagmi';
import { parseEther } from 'viem';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ABI for AgentVault (minimal)
const AGENT_VAULT_ABI = [
    {
        name: 'deposit',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ name: 'amount', type: 'uint256' }],
        outputs: []
    }
] as const;

const AGENT_VAULT_ADDRESS = process.env.NEXT_PUBLIC_AGENT_VAULT_ADDRESS as `0x${string}`;

export default function AutoAgentPanel() {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { signTypedDataAsync } = useSignTypedData();

    const [enabled, setEnabled] = useState(false);
    const [strategy, setStrategy] = useState('conservative');
    const [budget, setBudget] = useState('5');
    const [isLoading, setIsLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        if (address) {
            fetch(`/api/agent/settings?userAddress=${address}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.settings) {
                        setEnabled(data.settings.enabled);
                        setStrategy(data.settings.strategy);
                        setBudget(data.settings.budget.toString());
                    }
                });
        }
    }, [address]);

    const handleDeposit = async () => {
        if (!budget) return;
        try {
            setIsLoading(true);
            setStatusMsg("Submitting deposit...");
            const hash = await writeContractAsync({
                address: AGENT_VAULT_ADDRESS,
                abi: AGENT_VAULT_ABI,
                functionName: 'deposit',
                args: [parseEther(budget)]
            });
            setStatusMsg("Deposit successful: " + hash);
        } catch (e) {
            setStatusMsg("Deposit failed: " + String(e));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!address) return;
        try {
            setIsLoading(true);
            setStatusMsg("Signing delegation...");

            // 1. Sign Delegation
            const deadline = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days
            const nonce = 0; // Should fetch nonce from contract in real app

            const signature = await signTypedDataAsync({
                domain: {
                    name: 'FarcasterCartelAgent',
                    version: '1',
                    chainId: 84532, // Base Sepolia
                    verifyingContract: AGENT_VAULT_ADDRESS
                },
                types: {
                    ExecuteAction: [
                        { name: 'user', type: 'address' },
                        { name: 'action', type: 'string' },
                        { name: 'data', type: 'bytes' },
                        { name: 'nonce', type: 'uint256' },
                        { name: 'deadline', type: 'uint256' }
                    ]
                },
                primaryType: 'ExecuteAction',
                message: {
                    user: address,
                    action: strategy === 'aggressive' ? 'raid' : 'claim',
                    data: '0x',
                    nonce: BigInt(nonce),
                    deadline: BigInt(deadline)
                }
            });

            setStatusMsg("Saving settings...");

            // 2. Save to Backend
            const res = await fetch('/api/agent/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userAddress: address,
                    enabled,
                    strategy,
                    budget: Number(budget),
                    delegation: {
                        signature,
                        deadline,
                        nonce
                    }
                })
            });

            const data = await res.json();
            if (data.success) {
                setStatusMsg("Agent settings saved!");
            } else {
                throw new Error(data.error);
            }
        } catch (e) {
            setStatusMsg("Failed to save: " + String(e));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-4 bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                    <span>🤖 Auto-Agent</span>
                    <Button
                        variant={enabled ? "default" : "secondary"}
                        onClick={() => setEnabled(!enabled)}
                        className={enabled ? "bg-green-600 hover:bg-green-700" : "bg-zinc-700"}
                    >
                        {enabled ? "ON" : "OFF"}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-zinc-400">Strategy</Label>
                    <select
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                    >
                        <option value="conservative">Conservative (Claim Only)</option>
                        <option value="balanced">Balanced (Safe Raids)</option>
                        <option value="aggressive">Aggressive (Active Raids)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label className="text-zinc-400">Daily Budget (USDC)</Label>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                        <Button variant="outline" onClick={handleDeposit} disabled={isLoading}>
                            Deposit
                        </Button>
                    </div>
                </div>

                {statusMsg && (
                    <div className="text-sm text-yellow-400 p-2 bg-zinc-800 rounded">
                        {statusMsg}
                    </div>
                )}

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Save Configuration'}
                </Button>
            </CardContent>
        </Card>
    );
}
