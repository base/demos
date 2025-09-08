import { useSendCalls as useSendCalls$1 } from "wagmi/experimental";
import { GENERIC_ERROR_MESSAGE } from "../constants.js";
import { isUserRejectedRequestError } from "../utils/isUserRejectedRequestError.js";
import { normalizeTransactionId } from "../../internal/utils/normalizeWagmi.js";
function useSendCalls({
  setLifecycleStatus,
  setTransactionId
}) {
  const { status, sendCallsAsync, data, reset } = useSendCalls$1({
    mutation: {
      onError: (e) => {
        const errorMessage = isUserRejectedRequestError(e) ? "Request denied." : GENERIC_ERROR_MESSAGE;
        setLifecycleStatus({
          statusName: "error",
          statusData: {
            code: "TmUSCSh01",
            // Transaction module UseSendCalls hook 01 error
            error: e.message,
            message: errorMessage
          }
        });
      },
      onSuccess: (data2) => {
        setTransactionId(normalizeTransactionId(data2));
      }
    }
  });
  return { status, sendCallsAsync, data, reset };
}
export {
  useSendCalls
};
//# sourceMappingURL=useSendCalls.js.map
