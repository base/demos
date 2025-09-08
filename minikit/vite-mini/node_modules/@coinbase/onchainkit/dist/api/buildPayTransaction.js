import { RequestContext } from "../core/network/constants.js";
import { CDP_HYDRATE_CHARGE, CDP_CREATE_PRODUCT_CHARGE } from "../core/network/definitions/pay.js";
import { sendRequest } from "../core/network/request.js";
import { getPayErrorMessage } from "./utils/getPayErrorMessage.js";
async function buildPayTransaction(params, _context = RequestContext.API) {
  var _a;
  const { address, chargeId, productId } = params;
  try {
    let res;
    if (chargeId) {
      res = await sendRequest(
        CDP_HYDRATE_CHARGE,
        [
          {
            sender: address,
            chargeId
          }
        ],
        _context
      );
    } else if (productId) {
      res = await sendRequest(
        CDP_CREATE_PRODUCT_CHARGE,
        [
          {
            sender: address,
            productId
          }
        ],
        _context
      );
    } else {
      return {
        code: "AmBPTa01",
        // Api Module Build Pay Transaction Error 01
        error: "No chargeId or productId provided",
        message: getPayErrorMessage()
      };
    }
    if (res.error) {
      return {
        code: "AmBPTa02",
        // Api Module Build Pay Transaction Error 02
        error: res.error.message,
        message: getPayErrorMessage((_a = res.error) == null ? void 0 : _a.code)
      };
    }
    return res.result;
  } catch {
    return {
      code: "AmBPTa03",
      // Api Module Build Pay Transaction Error 03
      error: "Something went wrong",
      message: getPayErrorMessage()
    };
  }
}
export {
  buildPayTransaction
};
//# sourceMappingURL=buildPayTransaction.js.map
