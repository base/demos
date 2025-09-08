import { RequestContext } from "../../core/network/constants.js";
import "@farcaster/frame-sdk";
import "viem/chains";
import { buildPayTransaction } from "../../api/buildPayTransaction.js";
const handlePayRequest = async ({
  address,
  chargeHandler,
  productId
}) => {
  const buildPayTransactionParams = {
    address
  };
  if (chargeHandler) {
    buildPayTransactionParams.chargeId = await chargeHandler();
  } else if (productId) {
    buildPayTransactionParams.productId = productId;
  }
  const response = await buildPayTransaction(
    buildPayTransactionParams,
    RequestContext.Checkout
  );
  if ("error" in response) {
    throw new Error(response.error);
  }
  return response;
};
export {
  handlePayRequest
};
//# sourceMappingURL=handlePayRequest.js.map
