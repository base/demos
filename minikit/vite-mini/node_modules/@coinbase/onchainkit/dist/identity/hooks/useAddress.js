import { getAddress } from "../utils/getAddress.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
const useAddress = ({ name, chain = mainnet }, queryOptions) => {
  const queryKey = ["useAddress", name, chain.id];
  return useQuery({
    queryKey,
    queryFn: () => getAddress({ name }),
    enabled: !!name,
    ...DEFAULT_QUERY_OPTIONS,
    // Use cacheTime as gcTime for backward compatibility
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
};
export {
  useAddress
};
//# sourceMappingURL=useAddress.js.map
