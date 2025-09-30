"use client";

import { useState, useCallback } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { Button } from "~/components/ui/Button";

export function SwapTokenAction() {
  const [error, setError] = useState<string | null>(null);

  const handleSwapToken = useCallback(async (): Promise<void> => {
    setError(null); // Clear previous errors
    
    try {
      const result = await sdk.actions.swapToken({
        sellToken: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base USDC
        buyToken: "eip155:8453/native", // Base ETH
        sellAmount: "1000000", // 1 USDC
      });
      
      if (result.success) {
        console.log("Swap successful:", result.swap);
      } else {
        const errorMessage = result.error?.message || result.reason || "Swap failed";
        setError(errorMessage);
        console.log("Swap failed:", result.reason, result.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error performing swap";
      setError(errorMessage);
      console.error("Error performing swap:", error);
    }
  }, []);

  return (
    <div className="mb-4">
      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
        <pre className="font-mono text-xs text-emerald-500 dark:text-emerald-400">sdk.actions.swapToken</pre>
      </div>
      {error && (
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
          <pre className="font-mono text-xs text-emerald-500 dark:text-emerald-400">{error}</pre>
        </div>
      )}
      <Button onClick={handleSwapToken}>Swap Token</Button>
    </div>
  );
} 