import { useState, useCallback } from "react";
function useLifecycleStatus(initialState) {
  const [lifecycleStatus, setLifecycleStatus] = useState(initialState);
  const updateLifecycleStatus = useCallback(
    (newStatus) => {
      setLifecycleStatus((prevStatus) => {
        const persistedStatusData = prevStatus.statusName === "error" ? (
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (({ error, code, message, ...statusData }) => statusData)(
            prevStatus.statusData
          )
        ) : prevStatus.statusData;
        return {
          statusName: newStatus.statusName,
          statusData: {
            ...persistedStatusData,
            ...newStatus.statusData
          }
        };
      });
    },
    []
  );
  return [lifecycleStatus, updateLifecycleStatus];
}
export {
  useLifecycleStatus
};
//# sourceMappingURL=useLifecycleStatus.js.map
