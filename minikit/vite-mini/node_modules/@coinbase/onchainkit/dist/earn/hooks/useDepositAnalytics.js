import { useAnalytics } from "../../core/analytics/hooks/useAnalytics.js";
import { EarnEvent } from "../../core/analytics/types.js";
import { useEarnContext } from "../components/EarnProvider.js";
import { useState, useRef, useMemo, useEffect } from "react";
const useDepositAnalytics = (depositedAmount) => {
  const [transactionState, setTransactionState] = useState(null);
  const successSent = useRef(false);
  const errorSent = useRef(false);
  const { sendAnalytics } = useAnalytics();
  const { vaultAddress, vaultToken, recipientAddress, depositAmount } = useEarnContext();
  const analyticsData = useMemo(
    () => ({
      amount: Number(depositAmount) || Number(depositedAmount),
      // fall back to depositedAmount to avoid sending 0
      address: recipientAddress ?? "",
      tokenAddress: (vaultToken == null ? void 0 : vaultToken.address) ?? "",
      vaultAddress
    }),
    [
      depositedAmount,
      depositAmount,
      recipientAddress,
      vaultToken == null ? void 0 : vaultToken.address,
      vaultAddress
    ]
  );
  useEffect(() => {
    if (transactionState === "buildingTransaction") {
      successSent.current = false;
      sendAnalytics(EarnEvent.EarnDepositInitiated, analyticsData);
    }
    if (transactionState === "success" && !successSent.current) {
      successSent.current = true;
      sendAnalytics(EarnEvent.EarnDepositSuccess, analyticsData);
    }
    if (transactionState === "error" && !errorSent.current) {
      errorSent.current = true;
      sendAnalytics(EarnEvent.EarnDepositFailure, analyticsData);
    }
  }, [transactionState, analyticsData, sendAnalytics]);
  return {
    setTransactionState
  };
};
export {
  useDepositAnalytics
};
//# sourceMappingURL=useDepositAnalytics.js.map
