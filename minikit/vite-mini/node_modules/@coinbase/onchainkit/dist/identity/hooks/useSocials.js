import { getSocials } from "../utils/getSocials.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
const useSocials = ({ ensName, chain = mainnet }, queryOptions) => {
  const queryKey = ["useSocials", ensName, chain.id];
  return useQuery({
    queryKey,
    queryFn: () => getSocials({ ensName }),
    ...DEFAULT_QUERY_OPTIONS,
    // Use cacheTime as gcTime for backward compatibility
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
};
export {
  useSocials
};
//# sourceMappingURL=useSocials.js.map
