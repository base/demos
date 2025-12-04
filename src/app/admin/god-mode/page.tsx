"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GodMode() {
    const [secret, setSecret] = useState("");
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedCode(null);

        try {
            const response = await fetch('/api/admin/invites/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret,
                    count: 1
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setGeneratedCode(data.invites[0]);
            } else {
                setError(data.error || "Failed to generate invite");
            }
        } catch {
            setError("Network error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E12] text-white flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#1B1F26] border-red-900/50 shadow-2xl">
                <CardHeader className="text-center border-b border-red-900/20 pb-6">
                    <div className="text-4xl mb-2">👁️</div>
                    <CardTitle className="text-2xl font-black heading-font text-red-500 tracking-widest">
                        GOD MODE
                    </CardTitle>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">Founder Access Only</p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <label className="text-xs text-zinc-500 font-mono">ADMIN SECRET</label>
                        <input
                            type="password"
                            className="w-full bg-black/50 border border-zinc-800 rounded p-3 text-white focus:border-red-500 focus:outline-none font-mono"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            placeholder="Enter secret key..."
                        />
                    </div>

                    <Button
                        className="w-full bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 font-bold py-6 tracking-wider transition-all"
                        onClick={handleGenerate}
                        disabled={isLoading || !secret}
                    >
                        {isLoading ? "GENERATING..." : "GENERATE SINGLE-USE INVITE"}
                    </Button>

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {generatedCode && (
                        <div className="p-6 bg-black/50 border border-[#D4AF37]/30 rounded-xl text-center space-y-2 animate-in fade-in zoom-in duration-300">
                            <p className="text-xs text-[#D4AF37] uppercase tracking-widest">New Founder Invite</p>
                            <div className="text-3xl font-black font-mono text-white tracking-wider select-all cursor-pointer" onClick={() => navigator.clipboard.writeText(generatedCode)}>
                                {generatedCode}
                            </div>
                            <p className="text-[10px] text-zinc-600">Click to copy • One-time use</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
