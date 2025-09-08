import { useMemo } from "react";
import { formatUnits } from "viem";
import { useBalance } from "wagmi";
import { DEFAULT_QUERY_OPTIONS } from "../../internal/constants.js";
import { getRoundedAmount } from "../../internal/utils/getRoundedAmount.js";
import { getSwapErrorCode } from "../../swap/utils/getSwapErrorCode.js";
const ETH_DECIMALS = 18;
function useGetETHBalance(address) {
  const ethBalanceResponse = useBalance({
    address,
    query: {
      ...DEFAULT_QUERY_OPTIONS
    }
  });
  return useMemo(() => {
    var _a, _b, _c, _d;
    let error;
    if (ethBalanceResponse == null ? void 0 : ethBalanceResponse.error) {
      error = {
        code: getSwapErrorCode("balance"),
        error: (_a = ethBalanceResponse == null ? void 0 : ethBalanceResponse.error) == null ? void 0 : _a.message,
        message: ""
      };
    }
    if (!((_b = ethBalanceResponse == null ? void 0 : ethBalanceResponse.data) == null ? void 0 : _b.value) && ((_c = ethBalanceResponse == null ? void 0 : ethBalanceResponse.data) == null ? void 0 : _c.value) !== 0n) {
      return {
        convertedBalance: "",
        roundedBalance: "",
        error,
        response: ethBalanceResponse
      };
    }
    const convertedBalance = formatUnits(
      (_d = ethBalanceResponse == null ? void 0 : ethBalanceResponse.data) == null ? void 0 : _d.value,
      ETH_DECIMALS
    );
    const roundedBalance = getRoundedAmount(convertedBalance, 8);
    return {
      convertedBalance,
      error,
      response: ethBalanceResponse,
      roundedBalance
    };
  }, [ethBalanceResponse]);
}
export {
  useGetETHBalance
};
//# sourceMappingURL=useGetETHBalance.js.map
