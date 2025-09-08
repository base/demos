import { baseSepolia } from "viem/chains";
const ONCHAIN_KIT_CONFIG = {
  address: null,
  apiKey: null,
  chain: baseSepolia,
  config: {
    analytics: true,
    analyticsUrl: null,
    appearance: {
      name: null,
      logo: null,
      mode: null,
      theme: null
    },
    paymaster: null,
    wallet: {
      display: null,
      termsUrl: null,
      privacyUrl: null,
      supportedWallets: {
        rabby: false,
        trust: false,
        frame: false
      }
    }
  },
  rpcUrl: null,
  schemaId: null,
  projectId: null,
  sessionId: null
};
const getOnchainKitConfig = (configName) => {
  return ONCHAIN_KIT_CONFIG[configName];
};
const setOnchainKitConfig = (properties) => {
  Object.assign(ONCHAIN_KIT_CONFIG, properties);
  return getOnchainKitConfig;
};
export {
  ONCHAIN_KIT_CONFIG,
  getOnchainKitConfig,
  setOnchainKitConfig
};
//# sourceMappingURL=OnchainKitConfig.js.map
