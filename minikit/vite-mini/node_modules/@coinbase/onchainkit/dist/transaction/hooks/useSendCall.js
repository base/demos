import { useSendTransaction } from "wagmi";
import { GENERIC_ERROR_MESSAGE } from "../constants.js";
import { isUserRejectedRequestError } from "../utils/isUserRejectedRequestError.js";
function useSendCall({
  setLifecycleStatus,
  transactionHashList
}) {
  const {
    status,
    sendTransactionAsync: sendCallAsync,
    data,
    reset
  } = useSendTransaction({
    mutation: {
      onError: (e) => {
        const errorMessage = isUserRejectedRequestError(e) ? "Request denied." : GENERIC_ERROR_MESSAGE;
        setLifecycleStatus({
          statusName: "error",
          statusData: {
            code: "TmUSCh01",
            // Transaction module UseSendCall hook 01 error
            error: e.message,
            message: errorMessage
          }
        });
      },
      onSuccess: (hash) => {
        setLifecycleStatus({
          statusName: "transactionLegacyExecuted",
          statusData: {
            transactionHashList: [...transactionHashList, hash]
          }
        });
      }
    }
  });
  return { status, sendCallAsync, data, reset };
}
export {
  useSendCall
};
//# sourceMappingURL=useSendCall.js.map
