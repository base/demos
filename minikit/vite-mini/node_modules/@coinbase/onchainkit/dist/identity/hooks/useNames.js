import { getNames } from "../utils/getNames.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
const useNames = ({ addresses, chain = mainnet }, queryOptions) => {
  const addressesKey = addresses.join(",");
  const queryKey = ["useNames", addressesKey, chain.id];
  return useQuery({
    queryKey,
    queryFn: () => getNames({ addresses, chain }),
    enabled: !!addresses.length,
    ...DEFAULT_QUERY_OPTIONS,
    // Use cacheTime as gcTime for backward compatibility
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
};
export {
  useNames
};
//# sourceMappingURL=useNames.js.map
