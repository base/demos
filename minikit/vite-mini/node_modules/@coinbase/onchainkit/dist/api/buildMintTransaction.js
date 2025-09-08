import { RequestContext } from "../core/network/constants.js";
import { CDP_MINT_TOKEN } from "../core/network/definitions/nft.js";
import { sendRequest } from "../core/network/request.js";
async function buildMintTransaction(params, context = RequestContext.API) {
  const { mintAddress, tokenId, network = "", quantity, takerAddress } = params;
  try {
    const res = await sendRequest(
      CDP_MINT_TOKEN,
      [
        {
          mintAddress,
          network,
          quantity,
          takerAddress,
          tokenId
        }
      ],
      context
    );
    if (res.error) {
      return {
        code: `${res.error.code}`,
        error: "Error building mint transaction",
        message: res.error.message
      };
    }
    return res.result;
  } catch {
    return {
      code: "uncaught-nft",
      error: "Something went wrong",
      message: "Error building mint transaction"
    };
  }
}
export {
  buildMintTransaction
};
//# sourceMappingURL=buildMintTransaction.js.map
