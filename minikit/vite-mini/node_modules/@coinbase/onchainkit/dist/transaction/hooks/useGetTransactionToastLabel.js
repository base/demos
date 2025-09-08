import { useMemo } from "react";
import { color } from "../../styles/theme.js";
import { useTransactionContext } from "../components/TransactionProvider.js";
function useGetTransactionToastLabel() {
  const {
    errorMessage,
    isLoading,
    lifecycleStatus,
    receipt,
    transactionHash,
    transactionId
  } = useTransactionContext();
  const isInProgress = isLoading || !!transactionId || !!transactionHash;
  const isBuildingTransaction = lifecycleStatus.statusName === "buildingTransaction";
  return useMemo(() => {
    let label = "";
    let labelClassName = color.foregroundMuted;
    if (isBuildingTransaction) {
      label = "Building transaction";
    }
    if (isInProgress) {
      label = "Transaction in progress";
    }
    if (receipt) {
      label = "Successful";
    }
    if (errorMessage) {
      label = "Something went wrong";
      labelClassName = color.error;
    }
    return { label, labelClassName };
  }, [errorMessage, isBuildingTransaction, isInProgress, receipt]);
}
export {
  useGetTransactionToastLabel
};
//# sourceMappingURL=useGetTransactionToastLabel.js.map
