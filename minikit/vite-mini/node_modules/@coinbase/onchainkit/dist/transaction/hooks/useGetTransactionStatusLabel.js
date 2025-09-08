import { useMemo } from "react";
import { color } from "../../styles/theme.js";
import { useTransactionContext } from "../components/TransactionProvider.js";
function useGetTransactionStatusLabel() {
  const {
    errorMessage,
    isLoading,
    receipt,
    lifecycleStatus,
    transactionHash,
    transactionId
  } = useTransactionContext();
  const isInProgress = isLoading || !!transactionId || !!transactionHash;
  const isPending = lifecycleStatus.statusName === "transactionPending";
  const isBuildingTransaction = lifecycleStatus.statusName === "buildingTransaction";
  return useMemo(() => {
    let label = "";
    let labelClassName = color.foregroundMuted;
    if (isBuildingTransaction) {
      label = "Building transaction...";
    }
    if (isPending) {
      label = "Confirm in wallet.";
    }
    if (isInProgress) {
      label = "Transaction in progress...";
    }
    if (receipt) {
      label = "Successful";
    }
    if (errorMessage) {
      label = errorMessage;
      labelClassName = color.error;
    }
    return { label, labelClassName };
  }, [errorMessage, isBuildingTransaction, isInProgress, isPending, receipt]);
}
export {
  useGetTransactionStatusLabel
};
//# sourceMappingURL=useGetTransactionStatusLabel.js.map
