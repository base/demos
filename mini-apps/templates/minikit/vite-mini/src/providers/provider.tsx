import type { ReactNode } from 'react';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'viem/chains'; // or your preferred chain config

export function Provider({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
    >
      {children}
    </MiniKitProvider>
  );
}



