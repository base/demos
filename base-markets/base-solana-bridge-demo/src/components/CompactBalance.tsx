'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { solanaBridge } from '../lib/bridge';

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export const CompactBalance: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [solBalance, setSolBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mounted = useIsMounted();

  useEffect(() => {
    if (!mounted) {
      return;
    }
  }, [mounted]);

  // Load balance
  const loadBalance = useCallback(async () => {
    if (!publicKey) return;

    setIsLoading(true);
    try {
      const sol = await solanaBridge.getSolBalance(publicKey);
      setSolBalance(sol);
    } catch (err) {
      console.error('Error loading balance:', err);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey]);

  // Load balance on wallet connection and periodically
  useEffect(() => {
    if (connected && publicKey) {
      loadBalance();
      const interval = setInterval(loadBalance, 10000);
      return () => clearInterval(interval);
    }
  }, [connected, publicKey, loadBalance]);

  if (!mounted || !connected || !publicKey) {
    return null;
  }

  return (
    <div className="hacker-button !text-green-500 !bg-black !border-green-500 !text-sm !font-mono !px-4 !py-2.5 !min-w-[120px] text-center">
      {isLoading ? (
        <div className="animate-pulse hacker-text">Loading...</div>
      ) : (
        <span className="hacker-text">{solBalance.toFixed(6)} SOL</span>
      )}
    </div>
  );
};
