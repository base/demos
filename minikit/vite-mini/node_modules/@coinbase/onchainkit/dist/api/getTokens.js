import { RequestContext } from "../core/network/constants.js";
import { CDP_LIST_SWAP_ASSETS } from "../core/network/definitions/swap.js";
import { sendRequest } from "../core/network/request.js";
async function getTokens(options, _context = RequestContext.API) {
  const defaultFilter = {
    limit: "50",
    page: "1"
  };
  const filters = { ...defaultFilter, ...options };
  try {
    const res = await sendRequest(
      CDP_LIST_SWAP_ASSETS,
      [filters],
      _context
    );
    if (res.error) {
      return {
        code: "AmGTa01",
        error: res.error.code.toString(),
        message: res.error.message
      };
    }
    return res.result;
  } catch (error) {
    return {
      code: "AmGTa02",
      // Api module Get Tokens api Error O2
      error: JSON.stringify(error),
      message: "Request failed"
    };
  }
}
export {
  getTokens
};
//# sourceMappingURL=getTokens.js.map
