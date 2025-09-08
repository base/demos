import { getName } from "../utils/getName.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
const useName = ({ address, chain = mainnet }, queryOptions) => {
  const queryKey = ["useName", address, chain.id];
  return useQuery({
    queryKey,
    queryFn: () => getName({ address, chain }),
    enabled: !!address,
    ...DEFAULT_QUERY_OPTIONS,
    // Use cacheTime as gcTime for backward compatibility
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
};
export {
  useName
};
//# sourceMappingURL=useName.js.map
