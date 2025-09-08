import { useWriteContract as useWriteContract$1 } from "wagmi";
import { GENERIC_ERROR_MESSAGE } from "../constants.js";
import { isUserRejectedRequestError } from "../utils/isUserRejectedRequestError.js";
function useWriteContract({
  setLifecycleStatus,
  transactionHashList
}) {
  const { status, writeContractAsync, data } = useWriteContract$1({
    mutation: {
      onError: (e) => {
        const errorMessage = isUserRejectedRequestError(e) ? "Request denied." : GENERIC_ERROR_MESSAGE;
        setLifecycleStatus({
          statusName: "error",
          statusData: {
            code: "TmUWCh01",
            // Transaction module UseWriteContract hook 01 error
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
  return { status, writeContractAsync, data };
}
export {
  useWriteContract
};
//# sourceMappingURL=useWriteContract.js.map
