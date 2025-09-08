import { getMintDetails } from "../../api/getMintDetails.js";
import { RequestContext } from "../../core/network/constants.js";
import { isNFTError } from "../utils/isNFTError.js";
import { useQuery } from "@tanstack/react-query";
function useMintDetails(params, _context = RequestContext.Hook) {
  const { contractAddress, takerAddress, tokenId, queryOptions } = params;
  return useQuery({
    queryKey: ["useMintDetails", contractAddress, takerAddress, tokenId],
    queryFn: async () => {
      const mintDetails = await getMintDetails(
        {
          contractAddress,
          takerAddress,
          tokenId
        },
        _context
      );
      if (isNFTError(mintDetails)) {
        throw mintDetails;
      }
      return mintDetails;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...queryOptions
  });
}
export {
  useMintDetails
};
//# sourceMappingURL=useMintDetails.js.map
