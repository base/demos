'use client';

import React from 'react';

interface BalanceDisplayProps {
  solBalance: number;
  isLoading: boolean;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  solBalance,
  isLoading
}) => {
  const formatBalance = (balance: number, decimals: number = 4): string => {
    return balance.toFixed(decimals);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* SOL Balance */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">SOL Balance</p>
            <p className="text-3xl font-bold">
              {isLoading ? (
                <div className="animate-pulse bg-purple-300 h-8 w-24 rounded"></div>
              ) : (
                formatBalance(solBalance, 6)
              )}
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>
        <div className="mt-2 text-purple-100 text-xs">
          Available for bridging to Base Sepolia
        </div>
      </div>
    </div>
  );
};
