import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const cbWalletConnector = coinbaseWallet({
  appName: "Profiles Demo (dev)",
  preference: {
    keysUrl: "https://keys-dev.coinbase.com/connect",
    options: "smartWalletOnly",
  },
});

export function getConfig() {
  return createConfig({
    chains: [baseSepolia],
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
