import { RequestContext } from "../core/network/constants.js";
import { CDP_GET_PRICE_QUOTE } from "../core/network/definitions/wallet.js";
import { sendRequest } from "../core/network/request.js";
async function getPriceQuote(params, _context = RequestContext.API) {
  const apiParams = validateGetPriceQuoteParams(params);
  if ("error" in apiParams) {
    return apiParams;
  }
  try {
    const res = await sendRequest(
      CDP_GET_PRICE_QUOTE,
      [apiParams],
      _context
    );
    if (res.error) {
      return {
        code: String(res.error.code),
        error: "Error fetching price quote",
        message: res.error.message
      };
    }
    return res.result;
  } catch (error) {
    return {
      code: "UNCAUGHT_PRICE_QUOTE_ERROR",
      error: "Something went wrong",
      message: `Error fetching price quote: ${error}`
    };
  }
}
function validateGetPriceQuoteParams(params) {
  const { tokens } = params;
  if (!tokens || tokens.length === 0) {
    return {
      code: "INVALID_INPUT",
      error: "Invalid input: tokens must be an array of at least one token",
      message: "Tokens must be an array of at least one token"
    };
  }
  return params;
}
export {
  getPriceQuote
};
//# sourceMappingURL=getPriceQuote.js.map
