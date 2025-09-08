import { useCallback } from "react";
import { useConfig } from "wagmi";
import { Capabilities } from "../../core/constants.js";
import { sendBatchedTransactions } from "../utils/sendBatchedTransactions.js";
import { sendSingleTransactions } from "../utils/sendSingleTransactions.js";
const useSendWalletTransactions = ({
  capabilities,
  sendCallAsync,
  sendCallsAsync,
  walletCapabilities
}) => {
  const config = useConfig();
  return useCallback(
    async (transactions) => {
      var _a;
      if (!transactions) {
        return;
      }
      const resolvedTransactions = await Promise.resolve(transactions);
      if ((_a = walletCapabilities[Capabilities.AtomicBatch]) == null ? void 0 : _a.supported) {
        await sendBatchedTransactions({
          capabilities,
          sendCallsAsync,
          transactions: resolvedTransactions
        });
      } else {
        await sendSingleTransactions({
          config,
          sendCallAsync,
          transactions: resolvedTransactions
        });
      }
    },
    [sendCallsAsync, sendCallAsync, capabilities, walletCapabilities, config]
  );
};
export {
  useSendWalletTransactions
};
//# sourceMappingURL=useSendWalletTransactions.js.map
