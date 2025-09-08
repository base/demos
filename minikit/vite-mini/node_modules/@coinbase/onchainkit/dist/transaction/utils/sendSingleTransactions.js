import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "wagmi/actions";
import { isContract } from "./isContract.js";
const sendSingleTransactions = async ({
  config,
  sendCallAsync,
  transactions
}) => {
  const calls = transactions == null ? void 0 : transactions.map((transaction) => {
    if (isContract(transaction)) {
      return {
        data: encodeFunctionData({
          abi: transaction == null ? void 0 : transaction.abi,
          functionName: transaction == null ? void 0 : transaction.functionName,
          args: transaction == null ? void 0 : transaction.args
        }),
        to: transaction == null ? void 0 : transaction.address
      };
    }
    return transaction;
  });
  for (const call of calls) {
    const txHash = await sendCallAsync(call);
    if (txHash) {
      await waitForTransactionReceipt(config, {
        hash: txHash,
        confirmations: 1
      });
    }
  }
};
export {
  sendSingleTransactions
};
//# sourceMappingURL=sendSingleTransactions.js.map
