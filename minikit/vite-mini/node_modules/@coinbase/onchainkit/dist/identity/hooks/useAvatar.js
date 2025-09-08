import { getAvatar } from "../utils/getAvatar.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
const useAvatar = ({ ensName, chain = mainnet }, queryOptions) => {
  const queryKey = ["useAvatar", ensName, chain.id];
  return useQuery({
    queryKey,
    queryFn: () => getAvatar({ ensName, chain }),
    enabled: !!ensName,
    ...DEFAULT_QUERY_OPTIONS,
    // Use cacheTime as gcTime for backward compatibility
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
};
export {
  useAvatar
};
//# sourceMappingURL=useAvatar.js.map
