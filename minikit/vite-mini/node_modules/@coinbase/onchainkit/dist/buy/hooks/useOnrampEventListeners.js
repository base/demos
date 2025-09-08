import { useCallback, useEffect } from "react";
import { setupOnrampEventListeners } from "../../fund/utils/setupOnrampEventListeners.js";
const useOnrampEventListeners = ({
  updateLifecycleStatus,
  maxSlippage,
  lifecycleStatus
}) => {
  const handleOnrampEvent = useCallback(
    (data) => {
      if (data.eventName === "transition_view" && (lifecycleStatus == null ? void 0 : lifecycleStatus.statusName) !== "transactionPending") {
        updateLifecycleStatus({
          statusName: "transactionPending",
          statusData: {
            isMissingRequiredField: false,
            maxSlippage
          }
        });
      }
    },
    [maxSlippage, updateLifecycleStatus, lifecycleStatus == null ? void 0 : lifecycleStatus.statusName]
  );
  const handleOnrampSuccess = useCallback(() => {
    updateLifecycleStatus({
      statusName: "success",
      statusData: {
        isMissingRequiredField: false,
        transactionReceipt: {},
        maxSlippage
      }
    });
  }, [maxSlippage, updateLifecycleStatus]);
  const onPopupClose = useCallback(() => {
    updateLifecycleStatus({
      statusName: "init",
      statusData: {
        isMissingRequiredField: false,
        maxSlippage
      }
    });
  }, [updateLifecycleStatus, maxSlippage]);
  useEffect(() => {
    const unsubscribe = setupOnrampEventListeners({
      onEvent: handleOnrampEvent,
      onSuccess: handleOnrampSuccess
    });
    return () => {
      unsubscribe();
    };
  }, [handleOnrampEvent, handleOnrampSuccess]);
  return { onPopupClose };
};
export {
  useOnrampEventListeners
};
//# sourceMappingURL=useOnrampEventListeners.js.map
