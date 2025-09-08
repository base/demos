import { RequestContext } from "../core/network/constants.js";
import { CDP_GET_MINT_DETAILS } from "../core/network/definitions/nft.js";
import { sendRequest } from "../core/network/request.js";
async function getMintDetails(params, context = RequestContext.API) {
  const { contractAddress, takerAddress, tokenId } = params;
  try {
    const res = await sendRequest(
      CDP_GET_MINT_DETAILS,
      [
        {
          contractAddress,
          takerAddress,
          tokenId
        }
      ],
      context
    );
    if (res.error) {
      return {
        code: `${res.error.code}`,
        error: "Error fetching mint details",
        message: res.error.message
      };
    }
    return res.result;
  } catch {
    return {
      code: "uncaught-nft",
      error: "Something went wrong",
      message: "Error fetching mint details"
    };
  }
}
export {
  getMintDetails
};
//# sourceMappingURL=getMintDetails.js.map
