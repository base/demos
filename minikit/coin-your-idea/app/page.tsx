"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, ExternalLink, Copy, Plus, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { toast } from "sonner";
import { CoinDetails } from "./components/CoinDetails";
import { IdeaInput } from "./components/IdeaInput";
import { CreateCoinArgs } from "@/lib/types";
import { CoinButton } from "./components/CoinButton";
import { Logo } from "./components/Logo";
import Image from "next/image";
import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { TransactionModal } from "./components/TransactionModal";
import { useAccount } from 'wagmi';
import { WalletConnect } from "./components/WalletConnect";

interface ApiCoin {
  _id: string;
  id: string;
  name: string;
  symbol: string;
  description: string;
  metadataUrl: string;
  ownerAddress: string;
  createdAt: string;
}

const emptyCoinArgs: CreateCoinArgs = {
  name: "name",
  symbol: "symbol",
  uri: "uri",
  payoutRecipient: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  initialPurchaseWei: BigInt(1),
};

export default function Page() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const addFrame = useAddFrame();
  const [frameAdded, setFrameAdded] = useState(false);
  const [tab, setTab] = useState<'create' | 'mycoins'>('create');
  const [coinParams, setCoinParams] = useState<CreateCoinArgs | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [myCoins, setMyCoins] = useState<ApiCoin[]>([]);
  // Ethereum wallet status for gating
  const { status: accountStatus, address: accountAddress } = useAccount();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
    if (context?.client.added) setFrameAdded(true);
  }, [isFrameReady, setFrameReady, context]);

  const handleAddFrame = async () => {
    const added = await addFrame();
    setFrameAdded(Boolean(added));
  };

  const handleIdeaGenerated = (params: CreateCoinArgs) => {
    setCoinParams(params);
    setApiError(null);
    try { localStorage.setItem("coinParams", JSON.stringify(params)); } catch {}
  };

  const handleError = (error: Error) => {
    setApiError(error.message);
    setCoinParams(null);
  };

  const handleTxHash = async (hash: string) => {
    setTxHash(hash);
    if (accountStatus === 'connected' && accountAddress) {
      try {
        const res = await fetch(`/api/my-coins?owner=${accountAddress}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMyCoins(data);
        } else {
          setMyCoins([]);
          setApiError('Failed to load coins: Invalid API response');
        }
      } catch {
        setMyCoins([]);
        setApiError('Failed to load coins: Network error');
      }
    }
  };

  useEffect(() => {
    if (accountStatus === 'connected' && tab === 'mycoins' && accountAddress) {
      fetch(`/api/my-coins?owner=${accountAddress}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setMyCoins(data);
          else {
            setMyCoins([]);
            setApiError('Failed to load coins: Invalid API response');
          }
        })
        .catch(() => {
          setMyCoins([]);
          setApiError('Failed to load coins: Network error');
        });
    }
  }, [accountStatus, tab, accountAddress]);

  // Debug: log myCoins state
  useEffect(() => {
    console.log('MyCoins state:', myCoins);
  }, [myCoins]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getEtherscanLink = (hash: string) => `https://basescan.org/tx/${hash}`;

  return (
    <main className="min-h-screen relative">
      <Image src="/hero-bg.svg" alt="Background" fill className="object-cover -z-10" priority quality={75} sizes="100vw" />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-5xl">
        <div className="flex flex-row items-center justify-between mb-6 gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 sm:h-7 sm:w-7 text-accentPrimary" />
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-accentPrimary">CoinSpark</h1>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <WalletConnect />
            {!frameAdded && (
              <Button variant="ghost" size="icon" onClick={handleAddFrame} className="text-accentPrimary">
                <Plus className="h-4 w-4" />
              </Button>
            )}
            {frameAdded && (
              <span className="text-green-600">
                <Check className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>

        {apiError && (
          <Alert variant="destructive" className="mb-6 slide-in-from-top animate-in">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="flex space-x-4 mb-6">
            <button onClick={() => setTab('create')} className={`px-3 py-1 rounded font-medium transition-colors ${tab==='create'?'bg-accentPrimary text-white':'text-textPrimary hover:bg-accentPrimary/10'}`}>Create</button>
            <button onClick={() => setTab('mycoins')} className={`px-3 py-1 rounded font-medium transition-colors ${tab==='mycoins'?'bg-accentPrimary text-white':'text-textPrimary hover:bg-accentPrimary/10'}`}>My Coins</button>
          </div>

          {tab === 'create' ? (
            accountStatus === 'connected' ? (
              <>
                <IdeaInput onIdeaGenerated={handleIdeaGenerated} />
                {coinParams && (
                  <div className="space-y-4">
                    <CoinDetails coinParams={coinParams} />
                    <CoinButton {...coinParams} onSuccess={handleTxHash} onError={handleError} className="w-full sm:w-auto" />
                  </div>
                )}
                {txHash && (
                  <TransactionModal txHash={txHash} onClose={() => setTxHash(null)} />
                )}
              </>
            ) : (
              <div className="text-center text-textPrimary">
                <div className="py-12 sm:py-16 flex flex-col items-center justify-center">
                <Logo className="h-12 w-12 sm:h-16 sm:w-16 text-accentPrimary mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-accentPrimary font-heading">
                  CoinSpark
                </h2>
                <p className="text-center text-accentPrimary/80 text-sm sm:text-base max-w-xs sm:max-w-md mb-6">
                  Never let an idea go to waste. Coin it! <br />
                  Connect your wallet to get started.
                </p>
              </div>
              </div>
            )
          ) : (
            <div>
              {myCoins.length > 0 ? (
                <div className="grid gap-4">
                  {myCoins.map(coin => (
                    <Card key={coin.id} className="border">
                      <CardHeader><CardTitle>{coin.name} ({coin.symbol})</CardTitle></CardHeader>
                      <CardContent>{coin.description}</CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(`${window.location.origin}/coins/${coin.id}`)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const embedCode = `<iframe src="${window.location.origin}/coins/${coin.id}" width="400" height="500" style="border:none;"></iframe>`;
                              copyToClipboard(embedCode);
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(coin.metadataUrl)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-textSecondary py-12">
                  No coins found. Mint one to see it here!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
