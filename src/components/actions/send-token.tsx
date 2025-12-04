"use client";

import { useState, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useSendToken } from "@coinbase/onchainkit/minikit";

const RECIPIENT_ADDRESS = "0x8342A48694A74044116F330db5050a267b28dD85";

export function SendTokenAction() {
  const [recipientAddress, setRecipientAddress] = useState<string>(RECIPIENT_ADDRESS);
  const [amount, setAmount] = useState<string>("1");
  
  // Use MiniKit's useSendToken hook (React Query powered)
  const { sendToken, isPending, error, data } = useSendToken();

  const handleSendToken = useCallback((): void => {
    sendToken({
      token: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base USDC
      amount: (parseFloat(amount) * 1000000).toString(), // Convert to 6 decimals for USDC
      recipientAddress,
    });
  }, [sendToken, recipientAddress, amount]);

  return (
    <div className="mb-4">
      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
        <pre className="font-mono text-xs text-emerald-500 dark:text-emerald-400">useSendToken()</pre>
      </div>
      
      <div className="mb-2">
        <Label className="text-xs font-semibold text-gray-500 mb-1" htmlFor="send-recipient">
          Recipient Address
        </Label>
        <Input
          id="send-recipient"
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="mb-2 text-emerald-500 dark:text-emerald-400 text-xs"
          placeholder="0x..."
          disabled={isPending}
        />
      </div>
      
      <div className="mb-2">
        <Label className="text-xs font-semibold text-gray-500 mb-1" htmlFor="send-amount">
          Amount (USDC)
        </Label>
        <Input
          id="send-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2 text-emerald-500 dark:text-emerald-400 text-xs"
          placeholder="1.0"
          step="0.1"
          min="0"
          disabled={isPending}
        />
      </div>
      
      {error && (
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg my-2 text-xs text-red-600 dark:text-red-400">
          Error: {error.message}
        </div>
      )}
      
      {data && (
        <div className="p-2 bg-muted border border-border rounded-lg my-2">
          <div className="font-mono text-xs text-primary">Transaction initiated successfully!</div>
        </div>
      )}
      
      <Button 
        onClick={handleSendToken}
        disabled={isPending}
        isLoading={isPending}
      >
        {isPending ? "Processing..." : `Send ${amount} USDC`}
      </Button>
    </div>
  );
} 
