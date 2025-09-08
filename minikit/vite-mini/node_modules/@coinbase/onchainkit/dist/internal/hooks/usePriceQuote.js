import { RequestContext } from "../../core/network/constants.js";
import "@farcaster/frame-sdk";
import "viem/chains";
import { getPriceQuote } from "../../api/getPriceQuote.js";
import { DEFAULT_QUERY_OPTIONS } from "../constants.js";
import { isApiError } from "../utils/isApiResponseError.js";
import { useQuery } from "@tanstack/react-query";
function usePriceQuote(params, _context = RequestContext.Hook) {
  const { token, queryOptions } = params;
  return useQuery({
    queryKey: ["getPriceQuote", token],
    queryFn: async () => {
      if (!token) {
        return {
          priceQuotes: []
        };
      }
      const response = await getPriceQuote({ tokens: [token] }, _context);
      if (isApiError(response)) {
        throw response;
      }
      return response;
    },
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions
  });
}
export {
  usePriceQuote
};
//# sourceMappingURL=usePriceQuote.js.map
