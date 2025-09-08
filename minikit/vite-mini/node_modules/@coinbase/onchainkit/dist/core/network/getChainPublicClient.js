import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { getOnchainKitConfig } from "../OnchainKitConfig.js";
function getChainPublicClient(chain) {
  const apiKey = getOnchainKitConfig("apiKey");
  const rpcUrl = chain === base ? "https://api.developer.coinbase.com/rpc/v1/base" : "https://api.developer.coinbase.com/rpc/v1/base-sepolia";
  const useCustomRpc = (chain === base || chain === baseSepolia) && !!apiKey;
  return createPublicClient({
    chain,
    transport: useCustomRpc ? http(`${rpcUrl}/${apiKey}`) : http()
  });
}
export {
  getChainPublicClient
};
//# sourceMappingURL=getChainPublicClient.js.map
