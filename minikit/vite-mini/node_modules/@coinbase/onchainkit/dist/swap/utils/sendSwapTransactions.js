import { normalizeTransactionId } from "../../internal/utils/normalizeWagmi.js";
import { Capabilities } from "../../core/constants.js";
import { sendSingleTransactions } from "./sendSingleTransactions.js";
async function sendSwapTransactions({
  config,
  isSponsored,
  paymaster,
  sendCallsAsync,
  sendTransactionAsync,
  updateLifecycleStatus,
  walletCapabilities,
  transactions
}) {
  var _a;
  if ((_a = walletCapabilities[Capabilities.AtomicBatch]) == null ? void 0 : _a.supported) {
    updateLifecycleStatus({
      statusName: "transactionPending"
    });
    const data = await sendCallsAsync({
      calls: transactions.map(({ transaction }) => transaction),
      capabilities: isSponsored ? {
        paymasterService: {
          url: paymaster
        }
      } : {}
    });
    updateLifecycleStatus({
      statusName: "transactionApproved",
      statusData: {
        callsId: normalizeTransactionId(data),
        transactionType: "Batched"
      }
    });
  } else {
    await sendSingleTransactions({
      config,
      sendTransactionAsync,
      transactions,
      updateLifecycleStatus
    });
  }
}
export {
  sendSwapTransactions
};
//# sourceMappingURL=sendSwapTransactions.js.map
