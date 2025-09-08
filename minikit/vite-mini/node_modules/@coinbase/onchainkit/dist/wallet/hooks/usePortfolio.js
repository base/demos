import { getPortfolios } from "../../api/getPortfolios.js";
import { RequestContext } from "../../core/network/constants.js";
import { isApiError } from "../../internal/utils/isApiResponseError.js";
import { useQuery } from "@tanstack/react-query";
function usePortfolio({ address, enabled = true }, _context = RequestContext.Hook) {
  return useQuery({
    queryKey: ["usePortfolio", address],
    queryFn: async () => {
      const response = await getPortfolios(
        {
          addresses: [address]
          // Safe to coerce to Address because useQuery's enabled flag will prevent the query from running if address is undefined
        },
        _context
      );
      if (isApiError(response)) {
        throw new Error(response.message);
      }
      if (response.portfolios.length === 0) {
        return {
          address,
          portfolioBalanceUsd: 0,
          tokenBalances: []
        };
      }
      return response.portfolios[0];
    },
    retry: false,
    enabled: !!address && enabled,
    refetchOnWindowFocus: true,
    // refresh on window focus
    staleTime: 1e3 * 60 * 5,
    // refresh on mount every 5 minutes
    refetchOnMount: true,
    refetchInterval: 1e3 * 60 * 15,
    // refresh in background every 15 minutes
    refetchIntervalInBackground: true
  });
}
export {
  usePortfolio
};
//# sourceMappingURL=usePortfolio.js.map
