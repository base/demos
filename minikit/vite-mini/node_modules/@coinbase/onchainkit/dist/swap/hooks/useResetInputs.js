import { useCallback } from "react";
const useResetInputs = ({ from, to }) => {
  return useCallback(async () => {
    var _a, _b;
    await Promise.all([
      (_a = from.balanceResponse) == null ? void 0 : _a.refetch(),
      (_b = to.balanceResponse) == null ? void 0 : _b.refetch(),
      from.setAmount(""),
      from.setAmountUSD(""),
      to.setAmount(""),
      to.setAmountUSD("")
    ]);
  }, [from, to]);
};
export {
  useResetInputs
};
//# sourceMappingURL=useResetInputs.js.map
