import { RequestContext } from "../core/network/constants.js";
import { CDP_GET_TOKEN_DETAILS } from "../core/network/definitions/nft.js";
import { sendRequest } from "../core/network/request.js";
async function getTokenDetails(params, _context = RequestContext.API) {
  const { contractAddress, tokenId } = params;
  try {
    const res = await sendRequest(
      CDP_GET_TOKEN_DETAILS,
      [
        {
          contractAddress,
          tokenId
        }
      ],
      _context
    );
    if (res.error) {
      return {
        code: `${res.error.code}`,
        error: "Error fetching token details",
        message: res.error.message
      };
    }
    return res.result;
  } catch {
    return {
      code: "uncaught-nft",
      error: "Something went wrong",
      message: "Error fetching token details"
    };
  }
}
export {
  getTokenDetails
};
//# sourceMappingURL=getTokenDetails.js.map
