import { useWriteContracts as useWriteContracts$1 } from "wagmi/experimental";
import { METHOD_NOT_SUPPORTED_ERROR_SUBSTRING, GENERIC_ERROR_MESSAGE } from "../constants.js";
import { isUserRejectedRequestError } from "../utils/isUserRejectedRequestError.js";
import { normalizeTransactionId } from "../../internal/utils/normalizeWagmi.js";
function useWriteContracts({
  setLifecycleStatus,
  setTransactionId
}) {
  const { status, writeContractsAsync } = useWriteContracts$1({
    mutation: {
      onError: (e) => {
        if (e.message.includes(METHOD_NOT_SUPPORTED_ERROR_SUBSTRING)) {
          return;
        }
        const errorMessage = isUserRejectedRequestError(e) ? "Request denied." : GENERIC_ERROR_MESSAGE;
        setLifecycleStatus({
          statusName: "error",
          statusData: {
            code: "TmUWCSh01",
            // Transaction module UseWriteContracts hook 01 error
            error: e.message,
            message: errorMessage
          }
        });
      },
      onSuccess: (data) => {
        setTransactionId(normalizeTransactionId(data));
      }
    }
  });
  return { status, writeContractsAsync };
}
export {
  useWriteContracts
};
//# sourceMappingURL=useWriteContracts.js.map
