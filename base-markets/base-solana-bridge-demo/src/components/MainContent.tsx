'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
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
  baseTxHash?: string;
  estimatedCompletionTime?: number;
}

export const MainContent: React.FC = () => {
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

    // Show loading notification
    if ((window as any).showNotification) {
      (window as any).showNotification({
        type: 'info',
        title: 'Requesting SOL...',
        message: 'Processing faucet request via CDP',
        duration: 3000
      });
    }

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

      // Show success notification
      if ((window as any).showNotification) {
        (window as any).showNotification({
          type: 'success',
          title: 'Faucet Successful!',
          message: `Received ${data.amount} SOL from CDP faucet`,
          explorerUrl: `https://explorer.solana.com/tx/${data.transactionHash}?cluster=devnet`,
          duration: 7000
        });
      }

      setTimeout(async () => {
        await loadBalances();
      }, 2000);

    } catch (err) {
      console.error('SOL faucet error:', err);
      const errorMessage = err instanceof Error ? err.message : 'SOL faucet request failed';
      setError(errorMessage);
      
      // Show error notification
      if ((window as any).showNotification) {
        (window as any).showNotification({
          type: 'error',
          title: 'Faucet Failed',
          message: errorMessage,
          duration: 5000
        });
      }
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
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        error: err
      });
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
    } finally {
      setIsBridgeLoading(false);
    }
  };

  if (!connected || !publicKey) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 hacker-border bg-black mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="hacker-title text-xl mb-2">
          Connect Your Wallet
        </h2>
        <p className="hacker-text text-sm opacity-80">
          Connect your Solana wallet to start bridging SOL to Base Sepolia
        </p>
      </div>
    );
  }

  return (
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

      {/* Faucet and Bridge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SOL Faucet */}
        <div className="hacker-border bg-black p-6">
          <h3 className="hacker-title text-lg mb-8">Get SOL</h3>
          <FaucetButton 
            onFaucet={handleSolFaucet}
            isLoading={isFaucetLoading}
            disabled={!connected}
            label="Faucet SOL from CDP"
          />
          <div className="mt-8 space-y-3">
            <p className="white-text text-sm">Dispenses 0.00125 SOL on Solana Devnet</p>
            <p className="white-text text-sm">Limit: 10 claims per 24 hours</p>
            <p className="white-text text-sm">
              If this isn't working, try{' '}
              <a 
                href="https://faucet.solana.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                faucet.solana.com
              </a>
            </p>
          </div>
        </div>

        {/* Bridge */}
        <div className="hacker-border bg-black p-6">
          <h3 className="hacker-title text-lg mb-4">Bridge to Base</h3>
          <p className="white-text text-sm mb-4">
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

      {/* Transaction History */}
      {transactions.length > 0 && (
        <div className="hacker-border bg-black p-6">
          <h3 className="hacker-title text-lg mb-4">
            Transaction History
          </h3>
          <TransactionStatus transactions={transactions} />
        </div>
      )}
    </div>
  );
};
