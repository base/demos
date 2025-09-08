import { getAvatars } from "../utils/getAvatars.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
const useAvatars = ({ ensNames, chain = mainnet }, queryOptions) => {
  const namesKey = ensNames.join(",");
  const queryKey = ["useAvatars", namesKey, chain.id];
  return useQuery({
    queryKey,
    queryFn: () => getAvatars({ ensNames, chain }),
    enabled: !!ensNames.length,
    ...DEFAULT_QUERY_OPTIONS,
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
};
export {
  useAvatars
};
//# sourceMappingURL=useAvatars.js.map
