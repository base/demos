"use client";

import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { useSwapToken } from "@coinbase/onchainkit/minikit";

export function SwapTokenAction() {
  // Use MiniKit's useSwapToken hook (React Query powered)
  const { swapToken, isPending, error, data } = useSwapToken();

  const handleSwapToken = useCallback((): void => {
    swapToken({
      sellToken: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base USDC
      buyToken: "eip155:8453/native", // Base ETH
      sellAmount: "1000000", // 1 USDC
    });
  }, [swapToken]);

  return (
    <div className="mb-4">
      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
        <pre className="font-mono text-xs text-emerald-500 dark:text-emerald-400">useSwapToken()</pre>
      </div>
      
      {error && (
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg my-2 text-xs text-red-600 dark:text-red-400">
          Error: {error.message}
        </div>
      )}
      
      {data && (
        <div className="p-2 bg-muted border border-border rounded-lg my-2">
          <div className="font-mono text-xs text-primary">Swap initiated successfully!</div>
        </div>
      )}
      
      <Button 
        onClick={handleSwapToken}
        disabled={isPending}
        isLoading={isPending}
      >
        {isPending ? "Processing Swap..." : "Swap Token"}
      </Button>
    </div>
  );
} 
