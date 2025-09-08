import { SwapMessage } from "../constants.js";
import { getErrorMessage } from "./getErrorMessage.js";
function getSwapMessage({
  address,
  from,
  lifecycleStatus,
  to
}) {
  if (lifecycleStatus.statusName === "error") {
    return getErrorMessage(lifecycleStatus.statusData);
  }
  if (from.error || to.error) {
    return SwapMessage.BALANCE_ERROR;
  }
  if (address && Number(from.balance) < Number(from.amount)) {
    return SwapMessage.INSUFFICIENT_BALANCE;
  }
  if (lifecycleStatus.statusName === "transactionPending") {
    return SwapMessage.CONFIRM_IN_WALLET;
  }
  if (lifecycleStatus.statusName === "transactionApproved") {
    return SwapMessage.SWAP_IN_PROGRESS;
  }
  if (to.loading || from.loading) {
    return SwapMessage.FETCHING_QUOTE;
  }
  if (lifecycleStatus.statusData.isMissingRequiredField) {
    return SwapMessage.INCOMPLETE_FIELD;
  }
  return "";
}
export {
  getSwapMessage
};
//# sourceMappingURL=getSwapMessage.js.map
