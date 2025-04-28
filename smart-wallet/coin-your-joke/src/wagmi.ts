import { parseEther } from "viem";
import { toHex } from "viem";
import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const cbWalletConnector = coinbaseWallet({
  appName: "Coin Your Bangers - Sub Account Demo",
  preference: {
    keysUrl: "https://keys-dev.coinbase.com/connect",
    options: "smartWalletOnly",
  },
  subAccounts: {
    enableAutoSubAccounts: true,
    defaultSpendLimits: {
      84532: [
        {
          token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          allowance: toHex(parseEther('0.01')),
          period: 86400,
        },
      ],
    },
  },
});

export function getConfig() {
  return createConfig({
    chains: [ baseSepolia],
    connectors: [cbWalletConnector],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
