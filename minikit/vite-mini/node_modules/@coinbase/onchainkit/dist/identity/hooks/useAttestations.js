import { getAttestations } from "../utils/getAttestations.js";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { useQuery } from "@tanstack/react-query";
function useAttestations({ address, chain, schemaId }, queryOptions) {
  const result = useQuery({
    queryKey: ["useAttestations", address, chain == null ? void 0 : chain.id, schemaId],
    queryFn: async () => {
      return getAttestations(address, chain, { schemas: [schemaId] });
    },
    enabled: !!address && !!schemaId,
    ...DEFAULT_QUERY_OPTIONS,
    gcTime: queryOptions == null ? void 0 : queryOptions.cacheTime,
    ...queryOptions
  });
  return result.data || [];
}
export {
  useAttestations
};
//# sourceMappingURL=useAttestations.js.map
