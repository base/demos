'use client';

import React from 'react';
import { BridgeTransaction } from './BridgeInterface';

interface TransactionStatusProps {
  transactions: BridgeTransaction[];
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  transactions
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="animate-spin w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'confirmed':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'confirmed':
        return 'text-green-600 dark:text-green-400';
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    if (address.length > 42) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  const getSolanaExplorerLink = (txHash: string) => {
    return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
  };

  const getBaseExplorerLink = (txHash: string) => {
    return `https://sepolia.basescan.org/tx/${txHash}`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'relaying':
        return 'Relaying to Base';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx, index) => (
        <div
          key={`${tx.txHash}-${index}`}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            {getStatusIcon(tx.status)}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {tx.type === 'faucet' ? 'Faucet' : 'Bridge'}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {tx.amount} SOL
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{formatTime(tx.timestamp)}</span>
                {tx.type === 'bridge' && (
                  <>
                    <span>•</span>
                    <span>To: {formatAddress(tx.destinationAddress)}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getStatusColor(tx.status)}`}>
              {getStatusText(tx.status)}
            </span>
            <div className="flex items-center space-x-1">
              <a
                href={getSolanaExplorerLink(tx.txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                title="View on Solana Explorer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {tx.baseTransactionHash && (
                <a
                  href={getBaseExplorerLink(tx.baseTransactionHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  title="View on Base Sepolia Explorer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
