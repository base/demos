import { useMemo } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useReadContract } from "wagmi";
import { getRoundedAmount } from "../../internal/utils/getRoundedAmount.js";
import { getSwapErrorCode } from "../../swap/utils/getSwapErrorCode.js";
function useGetTokenBalance(address, token) {
  const tokenBalanceResponse = useReadContract({
    abi: erc20Abi,
    address: token == null ? void 0 : token.address,
    functionName: "balanceOf",
    args: address ? [address] : [],
    query: {
      enabled: !!(token == null ? void 0 : token.address) && !!address
    }
  });
  return useMemo(() => {
    var _a;
    let error;
    if (tokenBalanceResponse == null ? void 0 : tokenBalanceResponse.error) {
      error = {
        code: getSwapErrorCode("balance"),
        error: (_a = tokenBalanceResponse == null ? void 0 : tokenBalanceResponse.error) == null ? void 0 : _a.shortMessage,
        message: ""
      };
    }
    if ((tokenBalanceResponse == null ? void 0 : tokenBalanceResponse.data) !== 0n && !(tokenBalanceResponse == null ? void 0 : tokenBalanceResponse.data) || !token) {
      return {
        convertedBalance: "",
        status: tokenBalanceResponse.status,
        error,
        roundedBalance: "",
        response: tokenBalanceResponse,
        refetch: tokenBalanceResponse.refetch
      };
    }
    const convertedBalance = formatUnits(
      tokenBalanceResponse == null ? void 0 : tokenBalanceResponse.data,
      token == null ? void 0 : token.decimals
    );
    return {
      convertedBalance,
      status: tokenBalanceResponse.status,
      error,
      response: tokenBalanceResponse,
      roundedBalance: getRoundedAmount(convertedBalance, 8),
      refetch: tokenBalanceResponse.refetch
    };
  }, [token, tokenBalanceResponse]);
}
export {
  useGetTokenBalance
};
//# sourceMappingURL=useGetTokenBalance.js.map
