'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { solanaBridge } from '../lib/bridge';
import { FaucetButton } from './FaucetButton';
import { BridgeForm } from './BridgeForm';
import { TransactionStatus } from './TransactionStatus';

export interface BridgeTransaction {
  txHash: string;
  amount: number;
  destinationAddress: string;
  status: 'pending' | 'confirmed' | 'relaying' | 'completed' | 'failed';
  timestamp: number;
  type: 'bridge' | 'faucet';
  baseTransactionHash?: string;
  estimatedCompletionTime?: number;
}

export const CompactBridgeInterface: React.FC = () => {
  const { publicKey, connected, signTransaction } = useWallet();
  const { connection } = useConnection();
  
  // State
  const [solBalance, setSolBalance] = useState<number>(0);
  const [isFaucetLoading, setIsFaucetLoading] = useState<boolean>(false);
  const [isBridgeLoading, setIsBridgeLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<BridgeTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load balances
  const loadBalances = useCallback(async () => {
    if (!publicKey) return;

    try {
      const sol = await solanaBridge.getSolBalance(publicKey);
      setSolBalance(sol);
    } catch (err) {
      console.error('Error loading balances:', err);
      setError('Failed to load balances');
    }
  }, [publicKey]);

  // Load balances on wallet connection and periodically
  useEffect(() => {
    if (connected && publicKey) {
      loadBalances();
      const interval = setInterval(loadBalances, 10000);
      return () => clearInterval(interval);
    }
  }, [connected, publicKey, loadBalances]);

  // Handle SOL faucet request
  const handleSolFaucet = async () => {
    if (!publicKey) {
      setError('Wallet not connected');
      return;
    }

    setIsFaucetLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/faucet/sol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          address: publicKey.toString() 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'SOL faucet request failed');
      }

      const newTransaction: BridgeTransaction = {
        txHash: data.transactionHash,
        amount: data.amount,
        destinationAddress: publicKey.toString(),
        status: 'confirmed',
        timestamp: Date.now(),
        type: 'faucet'
      };

      setTransactions(prev => [newTransaction, ...prev]);

      setTimeout(async () => {
        await loadBalances();
      }, 2000);

    } catch (err) {
      console.error('SOL faucet error:', err);
      setError(err instanceof Error ? err.message : 'SOL faucet request failed');
    } finally {
      setIsFaucetLoading(false);
    }
  };

  // Handle bridge transaction
  const handleBridge = async (amount: number, destinationAddress: string) => {
    if (!publicKey) {
      setError('Wallet not connected');
      return;
    }

    if (amount > solBalance) {
      setError(`Insufficient SOL balance. You have ${solBalance.toFixed(6)} SOL but trying to bridge ${amount} SOL. Use the faucet to get more SOL.`);
      return;
    }

    setIsBridgeLoading(true);
    setError(null);

    try {
      if (!signTransaction) {
        throw new Error('Wallet does not support transaction signing');
      }

      const txHash = await solanaBridge.createBridgeTransaction(
        publicKey, 
        amount, 
        destinationAddress,
        signTransaction
      );

      const newTransaction: BridgeTransaction = {
        txHash,
        amount,
        destinationAddress,
        status: 'confirmed',
        timestamp: Date.now(),
        type: 'bridge'
      };

      setTransactions(prev => [newTransaction, ...prev]);
      await loadBalances();

    } catch (err) {
      console.error('Bridge error:', err);
      setError(err instanceof Error ? err.message : 'Bridge transaction failed');
    } finally {
      setIsBridgeLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Content */}
      {!connected ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Connect your Solana wallet to start bridging SOL to Base Sepolia
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-red-800 dark:text-red-200 font-medium">Error</p>
                  <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
                </div>
              </div>
              <button 
                onClick={() => setError(null)}
                className="mt-2 text-red-600 dark:text-red-400 text-sm hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Compact Layout */}
          <div className="space-y-6">
            {/* SOL Balance - Compact */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">SOL Balance</p>
                  <p className="text-2xl font-bold">
                    {(isFaucetLoading || isBridgeLoading) ? (
                      <div className="animate-pulse bg-purple-300 h-8 w-24 rounded"></div>
                    ) : (
                      solBalance.toFixed(6)
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Faucet and Bridge - Side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SOL Faucet */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Get SOL
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Get SOL on Solana Devnet to bridge to Base Sepolia
                </p>
                <FaucetButton 
                  onFaucet={handleSolFaucet}
                  isLoading={isFaucetLoading}
                  disabled={!connected}
                  label="Faucet SOL from CDP"
                />
              </div>

              {/* Bridge */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Bridge to Base
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Bridge your SOL from Solana Devnet to Base Sepolia
                </p>
                <BridgeForm 
                  onBridge={handleBridge}
                  maxAmount={solBalance}
                  isLoading={isBridgeLoading}
                  disabled={!connected}
                  tokenSymbol="SOL"
                />
              </div>
            </div>
          </div>

          {/* Transaction History */}
          {transactions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Transactions
              </h3>
              <TransactionStatus transactions={transactions} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
