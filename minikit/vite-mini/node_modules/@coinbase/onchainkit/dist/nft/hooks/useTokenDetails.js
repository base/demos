import { getTokenDetails } from "../../api/getTokenDetails.js";
import { RequestContext } from "../../core/network/constants.js";
import { isNFTError } from "../utils/isNFTError.js";
import { useQuery } from "@tanstack/react-query";
function useTokenDetails(params, _context = RequestContext.Hook) {
  const { contractAddress, tokenId, queryOptions } = params;
  return useQuery({
    queryKey: ["useTokenDetails", contractAddress, tokenId],
    queryFn: async () => {
      const tokenDetails = await getTokenDetails(
        {
          contractAddress,
          tokenId
        },
        _context
      );
      if (isNFTError(tokenDetails)) {
        throw tokenDetails;
      }
      return tokenDetails;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...queryOptions
  });
}
export {
  useTokenDetails
};
//# sourceMappingURL=useTokenDetails.js.map
