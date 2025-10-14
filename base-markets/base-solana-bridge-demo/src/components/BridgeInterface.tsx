'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { solanaBridge } from '../lib/bridge';
import { SOLANA_DEVNET_CONFIG, BRIDGE_CONFIG } from '../lib/constants';
import { FaucetButton } from './FaucetButton';
import { BridgeForm } from './BridgeForm';
import { BalanceDisplay } from './BalanceDisplay';
import { TransactionStatus } from './TransactionStatus';
import { UsdcMintWarning } from './UsdcMintWarning';

export interface BridgeTransaction {
  txHash: string;
  amount: number;
  destinationAddress: string;
  status: 'pending' | 'confirmed' | 'relaying' | 'completed' | 'failed';
  timestamp: number;
  type: 'bridge' | 'faucet';
  baseTransactionHash?: string; // Base Sepolia transaction hash when bridge completes
  estimatedCompletionTime?: number; // When bridge should complete
}

export const BridgeInterface: React.FC = () => {
  const { publicKey, connected, signTransaction } = useWallet();
  const { connection } = useConnection();
  
  // State
  const [cdpUsdcBalance, setCdpUsdcBalance] = useState<number>(0);
  const [bridgeUsdcBalance, setBridgeUsdcBalance] = useState<number>(0);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [isFaucetLoading, setIsFaucetLoading] = useState<boolean>(false);
  const [isBridgeLoading, setIsBridgeLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<BridgeTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showMintWarning, setShowMintWarning] = useState<boolean>(false);
  const [detectedUsdcMint, setDetectedUsdcMint] = useState<string>('');

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
      const interval = setInterval(loadBalances, 10000); // Refresh every 10 seconds
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
      // Request SOL from CDP faucet for the connected Solana wallet
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

      // Add to transaction history
      const newTransaction: BridgeTransaction = {
        txHash: data.transactionHash,
        amount: data.amount,
        destinationAddress: publicKey.toString(),
        status: 'confirmed',
        timestamp: Date.now(),
        type: 'faucet'
      };

      setTransactions(prev => [newTransaction, ...prev]);

      // Reload balances after a short delay
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

  // Handle CDP faucet request
  const handleFaucet = async () => {
    if (!publicKey) {
      setError('Wallet not connected');
      return;
    }

    setIsFaucetLoading(true);
    setError(null);

    try {
      // Request USDC from CDP faucet for the connected Solana wallet
      console.log('Making faucet request for address:', publicKey.toString());
      
      const response = await fetch('/api/faucet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          address: publicKey.toString() 
        }),
      });

      console.log('Faucet response status:', response.status);
      console.log('Faucet response headers:', response.headers);

      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned non-JSON response. Check server logs.');
      }

      const data = await response.json();
      console.log('Faucet response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Faucet request failed');
      }

      // Add to transaction history
      const newTransaction: BridgeTransaction = {
        txHash: data.transactionHash,
        amount: data.amount,
        destinationAddress: publicKey.toString(),
        status: 'confirmed',
        timestamp: Date.now(),
        type: 'faucet'
      };

      setTransactions(prev => [newTransaction, ...prev]);

      // Mock balance service removed for cleanup

      // Reload balances after a short delay
      setTimeout(async () => {
        await loadBalances();
      }, 2000);

    } catch (err) {
      console.error('Faucet error:', err);
      setError(err instanceof Error ? err.message : 'Faucet request failed');
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
      // Create real bridge transaction
      if (!signTransaction) {
        throw new Error('Wallet does not support transaction signing');
      }

      const txHash = await solanaBridge.createBridgeTransaction(
        publicKey, 
        amount, 
        destinationAddress,
        signTransaction
      );

      // Add to transaction history
      const newTransaction: BridgeTransaction = {
        txHash,
        amount,
        destinationAddress,
        status: 'confirmed', // Mock bridge returns confirmed status
        timestamp: Date.now(),
        type: 'bridge'
      };

      setTransactions(prev => [newTransaction, ...prev]);

      // Reload balances
      await loadBalances();

    } catch (err) {
      console.error('Bridge error:', err);
      setError(err instanceof Error ? err.message : 'Bridge transaction failed');
    } finally {
      setIsBridgeLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Connect your Solana wallet to start bridging USDC to Base Sepolia
            </p>
          </div>
          <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-blue-500 !rounded-lg !font-medium !transition-all !duration-200 hover:!scale-105" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wallet Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Wallet Connected
          </h2>
          <WalletMultiButton className="!bg-gray-100 !text-gray-900 dark:!bg-gray-700 dark:!text-white !rounded-lg !text-sm" />
        </div>
        
        <BalanceDisplay 
          solBalance={solBalance}
          isLoading={isFaucetLoading || isBridgeLoading}
        />
      </div>

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

      {/* USDC Mint Warning */}
      {showMintWarning && detectedUsdcMint && (
        <UsdcMintWarning
          userUsdcMint={detectedUsdcMint}
          bridgeUsdcMint="8KkQRERXdASmXqeWw7sPFB56wLxyHMKc9NPDW64EEL31"
          onDismiss={() => setShowMintWarning(false)}
        />
      )}

      {/* Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* SOL Faucet */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Get Test SOL
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Bridge to Base
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Bridge your USDC from Solana Devnet to Base Sepolia
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Transactions
          </h3>
          <TransactionStatus transactions={transactions} />
        </div>
      )}
    </div>
  );
};
