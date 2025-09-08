import { useLifecycleStatus } from "../../internal/hooks/useLifecycleStatus.js";
import { useEffect, useMemo } from "react";
const useEmitLifecycleStatus = ({
  onError,
  onSuccess,
  onStatus
}) => {
  const [lifecycleStatus, updateLifecycleStatus] = useLifecycleStatus({
    statusName: "init",
    statusData: null
  });
  useEffect(() => {
    if (lifecycleStatus.statusName === "error") {
      onError == null ? void 0 : onError(lifecycleStatus.statusData);
    }
    if (lifecycleStatus.statusName === "transactionSuccess") {
      onSuccess == null ? void 0 : onSuccess(lifecycleStatus.statusData);
    }
    onStatus == null ? void 0 : onStatus(lifecycleStatus);
  }, [
    onError,
    onStatus,
    onSuccess,
    lifecycleStatus,
    lifecycleStatus.statusData,
    lifecycleStatus.statusName
  ]);
  return useMemo(
    () => ({ lifecycleStatus, updateLifecycleStatus }),
    [lifecycleStatus, updateLifecycleStatus]
  );
};
export {
  useEmitLifecycleStatus
};
//# sourceMappingURL=useEmitLifecycleStatus.js.map
