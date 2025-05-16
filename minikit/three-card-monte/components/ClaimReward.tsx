"use client";

import { useAccount, useSwitchChain, createConfig, http } from "wagmi";
import { useState, useEffect } from "react";
import { baseSepolia } from "viem/chains";
import { encodeFunctionData } from "viem";
import { useSendCalls } from "wagmi/experimental";
import { GAME_CONTRACT_ABI } from "@/lib/abi";
import {
  GAME_CONTRACT_ADDRESS_SEPOLIA,
  PAYMASTER_URL_SEPOLIA,
} from "@/lib/constants";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";

interface ClaimRewardButtonProps {
  onSuccess?: () => void;
  hasWon?: boolean;
}

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(PAYMASTER_URL_SEPOLIA || ""),
  },
});

export function ClaimRewardButton({ onSuccess, hasWon = false }: ClaimRewardButtonProps) {
  const account = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [winRecorded, setWinRecorded] = useState(false);
  const { switchChain } = useSwitchChain();
  const { sendCalls } = useSendCalls({
    mutation: {
      onSuccess: () => {
        setSuccess(true);
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Error claiming reward:", error);
        setError("Failed to claim reward. Please try again.");
      },
    },
  });

  useEffect(() => {
    const recordWin = async () => {
      if (hasWon && account.isConnected && account.address && !winRecorded) {
        await sendWinToApi(account.address);
      }
    };
    
    recordWin();
  }, [hasWon, account.isConnected, account.address, winRecorded]);

  const sendWinToApi = async (playerAddress: string) => {
    if (winRecorded) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/win', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerAddress,
          score: 1,
          gameId: 'three-card-monte',
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to record win');
      }
      
      console.log('Win recorded successfully:', data);
      setWinRecorded(true);
    } catch (err) {
      console.error('Error recording win:', err);
      setError('Failed to record win. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectSuccess = async () => {
    console.log("Wallet connected successfully:", {
      address: account.address,
      isConnected: account.isConnected,
      chainId: account.chainId
    });
    
    if (hasWon && account.address) {
      await sendWinToApi(account.address);
    }
  };

  const handleClaim = async () => {
    if (!account.isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (!account.chainId) {
      setError("Please connect to Base Sepolia network");
      return;
    }

    if (account.chainId !== baseSepolia.id) {
      switchChain({ chainId: baseSepolia.id });
      return;
    }

    if (hasWon && !winRecorded && account.address) {
      await sendWinToApi(account.address);
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = encodeFunctionData({
        abi: GAME_CONTRACT_ABI,
        functionName: "claimReward",
        args: [true],
      });

      const calls = [
        {
          to: GAME_CONTRACT_ADDRESS_SEPOLIA,
          data,
        },
      ];

      sendCalls({
        calls,
        capabilities: {
          paymasterService: {
            url: PAYMASTER_URL_SEPOLIA || "",
          },
        },
      });
    } catch (err) {
      console.error("Error claiming reward:", err);
      setError("Failed to claim reward. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4">
          <p className="text-green-500">Reward claimed successfully! 🎉</p>
        </div>
      )}
      {winRecorded && !success && (
        <div className="mb-4">
          <p className="text-blue-400">Win recorded! Now claim your reward.</p>
        </div>
      )}
      {!account.isConnected ? (
        <ConnectWallet onConnect={handleConnectSuccess}>
          <button className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-white py-2 px-4 rounded-md text-sm font-medium">
            Connect Wallet
          </button>
        </ConnectWallet>
      ) : (
        <button
          onClick={handleClaim}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Claiming Reward...
            </div>
          ) : (
            "Claim Reward"
          )}
        </button>
      )}
    </div>
  );
}
