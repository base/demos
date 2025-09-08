import { createConfig, http, createStorage, cookieStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
const createWagmiConfig = ({
  apiKey,
  appName,
  appLogoUrl,
  connectors = [
    coinbaseWallet({
      appName,
      appLogoUrl,
      preference: "all"
    })
  ]
}) => {
  return createConfig({
    chains: [base, baseSepolia],
    connectors,
    storage: createStorage({
      storage: cookieStorage
    }),
    ssr: true,
    transports: {
      [base.id]: apiKey ? http(`https://api.developer.coinbase.com/rpc/v1/base/${apiKey}`) : http(),
      [baseSepolia.id]: apiKey ? http(
        `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${apiKey}`
      ) : http()
    }
  });
};
export {
  createWagmiConfig
};
//# sourceMappingURL=createWagmiConfig.js.map
