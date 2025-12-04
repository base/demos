"use client";

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains';
import WagmiProvider from "~/components/providers/WagmiProvider";
import FrameProvider from "~/components/providers/FrameProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnchainKitProvider
      chain={baseSepolia}
      apiKey={process.env.NEXT_PUBLIC_CDP_API_KEY}
    >
      <FrameProvider>
        <WagmiProvider>{children}</WagmiProvider>
      </FrameProvider>
    </OnchainKitProvider>
  );
}
