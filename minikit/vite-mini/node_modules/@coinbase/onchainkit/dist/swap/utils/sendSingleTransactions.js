import { waitForTransactionReceipt } from "wagmi/actions";
async function sendSingleTransactions({
  config,
  sendTransactionAsync,
  transactions,
  updateLifecycleStatus
}) {
  let transactionReceipt;
  for (const { transaction, transactionType } of transactions) {
    updateLifecycleStatus({
      statusName: "transactionPending"
    });
    const txHash = await sendTransactionAsync(transaction);
    updateLifecycleStatus({
      statusName: "transactionApproved",
      statusData: { transactionHash: txHash, transactionType }
    });
    transactionReceipt = await waitForTransactionReceipt(config, {
      hash: txHash,
      confirmations: 1
    });
  }
  if (transactionReceipt) {
    updateLifecycleStatus({
      statusName: "success",
      statusData: {
        transactionReceipt
      }
    });
  }
}
export {
  sendSingleTransactions
};
//# sourceMappingURL=sendSingleTransactions.js.map
