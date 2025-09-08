import { useAnalytics } from "../../core/analytics/hooks/useAnalytics.js";
import { EarnEvent } from "../../core/analytics/types.js";
import { useEarnContext } from "../components/EarnProvider.js";
import { useState, useRef, useMemo, useEffect } from "react";
const useWithdrawAnalytics = (withdrawnAmount) => {
  const [transactionState, setTransactionState] = useState(null);
  const successSent = useRef(false);
  const errorSent = useRef(false);
  const { sendAnalytics } = useAnalytics();
  const { vaultAddress, vaultToken, recipientAddress, withdrawAmount } = useEarnContext();
  const analyticsData = useMemo(
    () => ({
      amount: Number(withdrawAmount) || Number(withdrawnAmount),
      // fall back to withdrawnAmount to avoid sending 0
      address: recipientAddress ?? "",
      tokenAddress: (vaultToken == null ? void 0 : vaultToken.address) ?? "",
      vaultAddress
    }),
    [
      withdrawAmount,
      withdrawnAmount,
      recipientAddress,
      vaultToken == null ? void 0 : vaultToken.address,
      vaultAddress
    ]
  );
  useEffect(() => {
    if (transactionState === "buildingTransaction") {
      successSent.current = false;
      sendAnalytics(EarnEvent.EarnWithdrawInitiated, analyticsData);
    }
    if (transactionState === "success" && !successSent.current) {
      successSent.current = true;
      sendAnalytics(EarnEvent.EarnWithdrawSuccess, analyticsData);
    }
    if (transactionState === "error" && !errorSent.current) {
      errorSent.current = true;
      sendAnalytics(EarnEvent.EarnWithdrawFailure, analyticsData);
    }
  }, [transactionState, analyticsData, sendAnalytics]);
  return {
    setTransactionState
  };
};
export {
  useWithdrawAnalytics
};
//# sourceMappingURL=useWithdrawAnalytics.js.map
