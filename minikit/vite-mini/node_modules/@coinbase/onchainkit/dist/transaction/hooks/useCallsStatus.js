import { useCallsStatus as useCallsStatus$1 } from "wagmi/experimental";
import { normalizeStatus } from "../../internal/utils/normalizeWagmi.js";
function useCallsStatus({
  setLifecycleStatus,
  transactionId
}) {
  var _a, _b;
  try {
    const { data } = useCallsStatus$1({
      id: transactionId,
      query: {
        refetchInterval: (query) => {
          var _a2;
          return normalizeStatus((_a2 = query.state.data) == null ? void 0 : _a2.status) === "success" ? false : 1e3;
        },
        enabled: !!transactionId
      }
    });
    const transactionHash = (_b = (_a = data == null ? void 0 : data.receipts) == null ? void 0 : _a[0]) == null ? void 0 : _b.transactionHash;
    return { status: data == null ? void 0 : data.status, transactionHash };
  } catch (err) {
    setLifecycleStatus({
      statusName: "error",
      statusData: {
        code: "TmUCSh01",
        error: JSON.stringify(err),
        message: ""
      }
    });
    return { status: "error", transactionHash: void 0 };
  }
}
export {
  useCallsStatus
};
//# sourceMappingURL=useCallsStatus.js.map
