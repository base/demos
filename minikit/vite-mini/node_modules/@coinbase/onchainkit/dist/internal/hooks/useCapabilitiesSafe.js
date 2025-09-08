import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useCapabilities } from "wagmi/experimental";
function useCapabilitiesSafe({
  chainId
}) {
  const { isConnected } = useAccount();
  const { data: capabilities, error } = useCapabilities({
    query: { enabled: isConnected }
  });
  return useMemo(() => {
    if (error || !capabilities || !capabilities[chainId]) {
      return {};
    }
    return capabilities[chainId];
  }, [capabilities, chainId, error]);
}
export {
  useCapabilitiesSafe
};
//# sourceMappingURL=useCapabilitiesSafe.js.map
