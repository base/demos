import { createConfig, http, WagmiProvider } from "wagmi";
import { base, baseSepolia, optimism } from "wagmi/chains";
import { baseAccount, coinbaseWallet } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { METADATA } from "../../lib/utils";

export const config = createConfig({
  chains: [baseSepolia, base, optimism],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    farcasterMiniApp(),
    baseAccount({
      appName: METADATA.name,
      appLogoUrl: METADATA.iconImageUrl,
      // Paymaster configuration for gasless transactions
      // paymaster: {
      //   url: process.env.NEXT_PUBLIC_BASE_PAY_PAYMASTER_URL || 'https://paymaster.base.org',
      //   context: {
      //     policyId: process.env.NEXT_PUBLIC_PAYMASTER_POLICY_ID,
      //   },
      // },
    }),
    coinbaseWallet({
      appName: METADATA.name,
    }),
  ],
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
