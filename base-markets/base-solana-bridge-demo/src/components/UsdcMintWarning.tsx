'use client';

import React from 'react';

interface UsdcMintWarningProps {
  userUsdcMint: string;
  bridgeUsdcMint: string;
  onDismiss: () => void;
}

export const UsdcMintWarning: React.FC<UsdcMintWarningProps> = ({
  userUsdcMint,
  bridgeUsdcMint,
  onDismiss
}) => {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
      <div className="flex">
        <svg className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div className="flex-1">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium">
            USDC Mint Mismatch Detected
          </h3>
          <div className="mt-2 text-amber-700 dark:text-amber-300 text-sm">
            <p className="mb-2">
              Your wallet contains USDC from CDP Faucet, but the bridge expects a different USDC mint:
            </p>
            <div className="bg-amber-100 dark:bg-amber-900/40 rounded p-2 font-mono text-xs">
              <div className="mb-1">
                <span className="text-amber-600 dark:text-amber-400">Your USDC:</span> {userUsdcMint}
              </div>
              <div>
                <span className="text-amber-600 dark:text-amber-400">Bridge Expects:</span> {bridgeUsdcMint}
              </div>
            </div>
            <div className="mt-3">
              <p className="font-medium mb-2">Options to resolve this:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>
                  <strong>Use Bridge Faucet:</strong> Get USDC from the bridge's own faucet 
                  <code className="ml-1 px-1 bg-amber-200 dark:bg-amber-800 rounded">{bridgeUsdcMint}</code>
                </li>
                <li>
                  <strong>Swap Tokens:</strong> Use a Solana DEX (like Jupiter) to swap your CDP USDC for bridge USDC
                </li>
                <li>
                  <strong>Continue Anyway:</strong> Try bridging (may fail if bridge doesn't accept your USDC mint)
                </li>
              </ol>
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={onDismiss}
              className="text-amber-600 dark:text-amber-400 text-sm font-medium hover:underline"
            >
              Continue Anyway
            </button>
            <a
              href={`https://jup.ag/swap/4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU-8KkQRERXdASmXqeWw7sPFB56wLxyHMKc9NPDW64EEL31`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 text-sm font-medium hover:underline"
            >
              Swap on Jupiter →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

