import { parseEther } from "viem";
import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { toHex } from "viem";

export const cbWalletConnector = coinbaseWallet({
  appName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "MiniKit",
  preference: {
    keysUrl: "https://keys-dev.coinbase.com/connect",
    options: "smartWalletOnly",
    enableAutoSubAccounts: true,
    defaultSpendLimits: {
      [base.id]: [
        {
          token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          allowance: toHex(parseEther("0.01")),
          period: 86400,
        },
      ],
    },
  },
});

export function getConfig() {
  return createConfig({
    chains: [base],
    connectors: [cbWalletConnector],
    storage: createStorage({ storage: cookieStorage }),
    ssr: true,
    transports: {
      [base.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
} 