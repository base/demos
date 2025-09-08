import { isSwapError } from "../../swap/utils/isSwapError.js";
function validateQuote({
  to,
  responseETH,
  responseUSDC,
  responseFrom,
  updateLifecycleStatus
}) {
  if (!isSwapError(responseETH) && (responseETH == null ? void 0 : responseETH.toAmountUSD)) {
    to.setAmountUSD(responseETH == null ? void 0 : responseETH.toAmountUSD);
  } else if (!isSwapError(responseUSDC) && (responseUSDC == null ? void 0 : responseUSDC.toAmountUSD)) {
    to.setAmountUSD(responseUSDC.toAmountUSD);
  } else if (!isSwapError(responseFrom) && (responseFrom == null ? void 0 : responseFrom.toAmountUSD)) {
    to.setAmountUSD(responseFrom.toAmountUSD);
  } else {
    updateLifecycleStatus({
      statusName: "error",
      statusData: {
        code: "TmBPc01",
        error: "No valid quote found",
        message: ""
      }
    });
    return { isValid: false };
  }
  return { isValid: true };
}
export {
  validateQuote
};
//# sourceMappingURL=validateQuote.js.map
