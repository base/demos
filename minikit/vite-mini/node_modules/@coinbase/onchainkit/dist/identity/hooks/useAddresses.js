import { getAddresses } from "../utils/getAddresses.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
const useAddresses = ({ names }, queryOptions) => {
  const namesKey = names.join(",");
  const queryKey = ["useAddresses", namesKey];
  return useQuery({
    queryKey,
    queryFn: () => getAddresses({ names }),
    enabled: !!names.length,
    ...DEFAULT_QUERY_OPTIONS,
    // Use cacheTime as gcTime for backward compatibility
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
};
export {
  useAddresses
};
//# sourceMappingURL=useAddresses.js.map
