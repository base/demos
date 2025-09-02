"use client";

import { useState, useCallback } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { Button } from "~/components/ui/Button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

const RECIPIENT_ADDRESS = "0x8342A48694A74044116F330db5050a267b28dD85";

export function SendTokenAction() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>(RECIPIENT_ADDRESS);
  const [amount, setAmount] = useState<string>("1");

  const handleSendToken = useCallback(async (): Promise<void> => {
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success
    
    try {
      const result = await sdk.actions.sendToken({
        token: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base USDC
        amount: (parseFloat(amount) * 1000000).toString(), // Convert to 6 decimals for USDC
        recipientAddress,
      });
      
      if (result.success) {
        console.log("Send successful:", result.send);
        setSuccess(`Transaction initiated successfully!`);
      } else {
        const errorMessage = result.error?.message || result.reason || "Send failed";
        setError(errorMessage);
        console.log("Send failed:", result.reason, result.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error sending token";
      setError(errorMessage);
      console.error("Error sending token:", error);
    }
  }, [recipientAddress, amount]);

  return (
    <div className="mb-4">
      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
        <pre className="font-mono text-xs text-emerald-500 dark:text-emerald-400">sdk.actions.sendToken</pre>
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
        />
      </div>
      
      {error && (
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
          <pre className="font-mono text-xs text-red-500 dark:text-red-400">{error}</pre>
        </div>
      )}
      {success && (
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
          <pre className="font-mono text-xs text-green-500 dark:text-green-400">{success}</pre>
        </div>
      )}
      <Button onClick={handleSendToken}>Send {amount} USDC</Button>
    </div>
  );
} 