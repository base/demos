'use client';
import { useReadContract } from "wagmi";
import { DeployChainABI } from "../abi.js";
import { APPCHAIN_DEPLOY_CONTRACT_ADDRESS } from "../constants.js";
function useChainConfig(params) {
  const { data, isLoading, isError, error } = useReadContract({
    abi: DeployChainABI,
    functionName: "deployAddresses",
    args: [BigInt(params.appchainChainId)],
    address: APPCHAIN_DEPLOY_CONTRACT_ADDRESS[params.l2ChainId],
    query: {
      staleTime: 1e3 * 60 * 60,
      // 1 hour
      retry: 2,
      enabled: !!params.l2ChainId && !!params.appchainChainId,
      gcTime: 0
    },
    // Read from the L2 contract
    chainId: params.l2ChainId
  });
  return {
    config: error ? void 0 : {
      chainId: params.appchainChainId,
      contracts: data
    },
    isLoading,
    isError,
    error
  };
}
export {
  useChainConfig
};
//# sourceMappingURL=useAppchainConfig.js.map
