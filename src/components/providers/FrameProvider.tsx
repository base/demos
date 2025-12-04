'use client'

// import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface MiniAppClient {
  platformType?: 'web' | 'mobile';
  clientFid: number;
  added: boolean;
  safeAreaInsets?: SafeAreaInsets;
  notificationDetails?: {
    url: string;
    token: string;
  };
}

interface MiniAppContext {
  user: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
  location?: Record<string, unknown>;
  client: MiniAppClient;
}

type FrameContextType = {
  context: MiniAppContext | Record<string, unknown> | null;
  isInMiniApp: boolean;
} | null;

const FrameContext = createContext<FrameContextType>(null);

export const useFrameContext = () => useContext(FrameContext);

export default function FrameProvider({ children }: { children: ReactNode }) {
  const [frameContext, setFrameContext] = useState<FrameContextType>(null);
  // const { context } = useMiniKit();

  useEffect(() => {
    /*
    if (context) {
      setFrameContext({
        context: context as MiniAppContext,
        isInMiniApp: true
      });
    } else {
    */
    setFrameContext({
      context: null,
      isInMiniApp: false
    });
    // }
  }, [])

  return (
    <FrameContext.Provider value={frameContext}>
      {children}
    </FrameContext.Provider>
  );
}
