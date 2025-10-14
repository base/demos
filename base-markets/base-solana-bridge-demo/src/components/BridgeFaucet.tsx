'use client';

import React, { useState } from 'react';

interface BridgeFaucetProps {
  onFaucet: () => Promise<void>;
  isLoading: boolean;
  disabled: boolean;
}

export const BridgeFaucet: React.FC<BridgeFaucetProps> = ({
  onFaucet,
  isLoading,
  disabled
}) => {
  const handleFaucet = async () => {
    await onFaucet();
  };

  return (
    <div className="space-y-4">
      {/* Bridge Faucet Info */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">🌉</span>
          </div>
          <span className="font-medium text-purple-900 dark:text-purple-100">Bridge Faucet</span>
        </div>
        <p className="text-sm text-purple-700 dark:text-purple-300">
          Get bridge-compatible USDC on Solana Devnet
        </p>
        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-mono">
          Mint: 8KkQRERXdASmXqeWw7sPFB56wLxyHMKc9NPDW64EEL31
        </p>
      </div>

      {/* Faucet Button */}
      <button
        onClick={handleFaucet}
        disabled={disabled || isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Minting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Get Bridge USDC
          </>
        )}
      </button>

      {/* Info */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Bridge-compatible USDC for cross-chain transfers
      </div>
    </div>
  );
};

