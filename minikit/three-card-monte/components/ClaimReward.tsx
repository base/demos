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
        <div className="mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-center">
          <p className="text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-900/40 border border-green-500/50 rounded-lg text-center">
          <p className="text-green-400 text-sm font-medium">Reward claimed successfully! 🎉</p>
        </div>
      )}
      {winRecorded && !success && (
        <div className="mb-4 p-3 bg-blue-900/40 border border-blue-500/50 rounded-lg text-center">
          <p className="text-blue-300 text-sm font-medium">Win recorded! Now claim your reward.</p>
        </div>
      )}
      
      <div className="mt-2">
        {!account.isConnected ? (
          <ConnectWallet onConnect={handleConnectSuccess}>
            <button className="w-full py-3 text-base font-medium text-white rounded-lg shadow-md border border-indigo-500/30 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 transition-all duration-200">
              Connect Wallet
            </button>
          </ConnectWallet>
        ) : (
          <button
            onClick={handleClaim}
            disabled={isLoading}
            className="w-full py-3 text-base font-medium text-white rounded-lg shadow-md border border-green-500/30 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 disabled:from-gray-600 disabled:to-gray-800 disabled:border-gray-500/30 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Claiming Reward...
              </div>
            ) : (
              "Claim Reward"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
