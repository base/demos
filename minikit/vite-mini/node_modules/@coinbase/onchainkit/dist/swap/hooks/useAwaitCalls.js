import { useCallback } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useCallsStatus } from "wagmi/experimental";
import { normalizeStatus } from "../../internal/utils/normalizeWagmi.js";
function useAwaitCalls({
  accountConfig,
  lifecycleStatus,
  updateLifecycleStatus
}) {
  var _a;
  const callsId = lifecycleStatus.statusName === "transactionApproved" ? (_a = lifecycleStatus.statusData) == null ? void 0 : _a.callsId : void 0;
  const { data } = useCallsStatus({
    id: callsId || "",
    query: {
      refetchInterval: (query) => {
        var _a2;
        return normalizeStatus((_a2 = query.state.data) == null ? void 0 : _a2.status) === "success" ? false : 1e3;
      },
      enabled: callsId !== void 0
    }
  });
  return useCallback(async () => {
    if (normalizeStatus(data == null ? void 0 : data.status) === "success" && (data == null ? void 0 : data.receipts)) {
      const transactionReceipt = await waitForTransactionReceipt(
        accountConfig,
        {
          confirmations: 1,
          hash: data.receipts[data.receipts.length - 1].transactionHash
        }
      );
      updateLifecycleStatus({
        statusName: "success",
        statusData: {
          transactionReceipt
        }
      });
    }
  }, [accountConfig, data, updateLifecycleStatus]);
}
export {
  useAwaitCalls
};
//# sourceMappingURL=useAwaitCalls.js.map
