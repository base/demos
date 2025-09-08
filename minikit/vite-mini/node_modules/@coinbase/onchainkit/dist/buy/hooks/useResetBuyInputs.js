import { useCallback } from "react";
const useResetBuyInputs = ({
  fromETH,
  fromUSDC,
  from,
  to
}) => {
  return useCallback(async () => {
    var _a, _b, _c, _d;
    await Promise.all([
      (_a = from == null ? void 0 : from.balanceResponse) == null ? void 0 : _a.refetch(),
      from == null ? void 0 : from.setAmount(""),
      from == null ? void 0 : from.setAmountUSD(""),
      (_b = fromETH.balanceResponse) == null ? void 0 : _b.refetch(),
      fromETH.setAmount(""),
      fromETH.setAmountUSD(""),
      (_c = fromUSDC.balanceResponse) == null ? void 0 : _c.refetch(),
      fromUSDC.setAmount(""),
      fromUSDC.setAmountUSD(""),
      (_d = to.balanceResponse) == null ? void 0 : _d.refetch(),
      to.setAmount(""),
      to.setAmountUSD("")
    ]);
  }, [from, fromETH, fromUSDC, to]);
};
export {
  useResetBuyInputs
};
//# sourceMappingURL=useResetBuyInputs.js.map
