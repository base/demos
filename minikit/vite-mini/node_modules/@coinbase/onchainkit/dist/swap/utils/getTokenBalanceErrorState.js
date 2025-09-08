import { getSwapErrorCode } from "./getSwapErrorCode.js";
function getTokenBalanceErrorState({
  ethBalance,
  token,
  tokenBalance
}) {
  var _a, _b;
  if ((token == null ? void 0 : token.symbol) === "ETH" && (ethBalance == null ? void 0 : ethBalance.error)) {
    return {
      error: (_a = ethBalance == null ? void 0 : ethBalance.error) == null ? void 0 : _a.message,
      code: getSwapErrorCode("balance")
    };
  }
  if (token && (token == null ? void 0 : token.symbol) !== "ETH" && (tokenBalance == null ? void 0 : tokenBalance.isError)) {
    return {
      error: (_b = tokenBalance == null ? void 0 : tokenBalance.error) == null ? void 0 : _b.shortMessage,
      code: getSwapErrorCode("balance")
    };
  }
}
export {
  getTokenBalanceErrorState
};
//# sourceMappingURL=getTokenBalanceErrorState.js.map
