import { getSwapQuote } from "../../api/getSwapQuote.js";
import { RequestContext } from "../../core/network/constants.js";
import { formatTokenAmount } from "../../internal/utils/formatTokenAmount.js";
import { isSwapError } from "../../swap/utils/isSwapError.js";
async function getBuyQuote({
  amount,
  from,
  maxSlippage,
  to,
  useAggregator,
  fromSwapUnit
}) {
  if (!from) {
    return { response: void 0, formattedFromAmount: "", error: void 0 };
  }
  let response;
  if ((to == null ? void 0 : to.symbol) !== (from == null ? void 0 : from.symbol)) {
    response = await getSwapQuote(
      {
        amount,
        amountReference: "from",
        from: to,
        maxSlippage,
        to: from,
        useAggregator
      },
      RequestContext.Buy
    );
  }
  let formattedFromAmount = "";
  if (response && !isSwapError(response)) {
    formattedFromAmount = (response == null ? void 0 : response.toAmount) ? formatTokenAmount(response.toAmount, response.to.decimals) : "";
    fromSwapUnit == null ? void 0 : fromSwapUnit.setAmountUSD((response == null ? void 0 : response.toAmountUSD) || "");
    fromSwapUnit == null ? void 0 : fromSwapUnit.setAmount(formattedFromAmount || "");
  }
  let error;
  if (isSwapError(response)) {
    error = response;
    response = void 0;
  }
  return { response, formattedFromAmount, error };
}
export {
  getBuyQuote
};
//# sourceMappingURL=getBuyQuote.js.map
