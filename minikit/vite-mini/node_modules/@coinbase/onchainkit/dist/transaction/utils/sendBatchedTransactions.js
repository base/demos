import { isContract } from "./isContract.js";
const sendBatchedTransactions = async ({
  capabilities,
  sendCallsAsync,
  transactions
}) => {
  if (!transactions) {
    return;
  }
  const calls = transactions == null ? void 0 : transactions.map((transaction) => {
    if (isContract(transaction)) {
      const { address, ...rest } = transaction;
      return {
        ...rest,
        to: address
      };
    }
    return transaction;
  });
  await sendCallsAsync({
    calls,
    capabilities
  });
};
export {
  sendBatchedTransactions
};
//# sourceMappingURL=sendBatchedTransactions.js.map
