import { RequestContext } from "../core/network/constants.js";
import { CDP_GET_PORTFOLIO_TOKEN_BALANCES } from "../core/network/definitions/wallet.js";
import { sendRequest } from "../core/network/request.js";
async function getPortfolios(params, _context = RequestContext.API) {
  const { addresses } = params;
  try {
    const res = await sendRequest(
      CDP_GET_PORTFOLIO_TOKEN_BALANCES,
      [{ addresses }],
      _context
    );
    if (res.error) {
      return {
        code: `${res.error.code}`,
        error: "Error fetching portfolio token balances",
        message: res.error.message
      };
    }
    return res.result;
  } catch (error) {
    return {
      code: "uncaught-portfolio",
      error: "Something went wrong",
      message: `Error fetching portfolio token balances: ${error}`
    };
  }
}
export {
  getPortfolios
};
//# sourceMappingURL=getPortfolios.js.map
