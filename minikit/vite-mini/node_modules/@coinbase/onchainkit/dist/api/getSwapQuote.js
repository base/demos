import { RequestContext } from "../core/network/constants.js";
import { SwapMessage, UNSUPPORTED_AMOUNT_REFERENCE_ERROR_CODE } from "../swap/constants.js";
import { CDP_GET_SWAP_QUOTE } from "../core/network/definitions/swap.js";
import { sendRequest } from "../core/network/request.js";
import { getSwapErrorCode } from "../swap/utils/getSwapErrorCode.js";
import { getAPIParamsForToken } from "./utils/getAPIParamsForToken.js";
async function getSwapQuote(params, _context = RequestContext.API) {
  var _a;
  const defaultParams = {
    amountReference: "from",
    isAmountInDecimals: false
  };
  let apiParams = getAPIParamsForToken({
    ...defaultParams,
    ...params
  });
  if ("error" in apiParams) {
    return apiParams;
  }
  if (params.useAggregator && params.amountReference === "to") {
    console.error(SwapMessage.UNSUPPORTED_AMOUNT_REFERENCE);
    return {
      code: UNSUPPORTED_AMOUNT_REFERENCE_ERROR_CODE,
      error: SwapMessage.UNSUPPORTED_AMOUNT_REFERENCE,
      message: ""
    };
  }
  if (!params.useAggregator) {
    apiParams = {
      v2Enabled: true,
      ...apiParams
    };
  }
  if (params.maxSlippage) {
    let slippagePercentage = params.maxSlippage;
    if (params.useAggregator) {
      slippagePercentage = (Number(params.maxSlippage) * 10).toString();
    }
    apiParams = {
      slippagePercentage,
      ...apiParams
    };
  }
  try {
    const res = await sendRequest(
      CDP_GET_SWAP_QUOTE,
      [apiParams],
      _context
    );
    if (res.error) {
      return {
        code: getSwapErrorCode("quote", (_a = res.error) == null ? void 0 : _a.code),
        error: res.error.message,
        message: ""
      };
    }
    return res.result;
  } catch {
    return {
      code: getSwapErrorCode("uncaught-quote"),
      error: "Something went wrong",
      message: ""
    };
  }
}
export {
  getSwapQuote
};
//# sourceMappingURL=getSwapQuote.js.map
