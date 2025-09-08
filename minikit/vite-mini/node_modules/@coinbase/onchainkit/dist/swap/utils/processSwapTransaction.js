import { parseAbi, encodeFunctionData } from "viem";
import { base } from "viem/chains";
import { UNIVERSALROUTER_CONTRACT_ADDRESS, PERMIT2_CONTRACT_ADDRESS } from "../constants.js";
import { sendSwapTransactions } from "./sendSwapTransactions.js";
async function processSwapTransaction({
  chainId,
  config,
  isSponsored,
  paymaster,
  sendCallsAsync,
  sendTransactionAsync,
  swapTransaction,
  switchChainAsync,
  updateLifecycleStatus,
  useAggregator,
  walletCapabilities
}) {
  const { transaction, approveTransaction, quote } = swapTransaction;
  const transactions = [];
  if (approveTransaction == null ? void 0 : approveTransaction.data) {
    transactions.push({
      transaction: {
        to: approveTransaction.to,
        value: approveTransaction.value,
        data: approveTransaction.data
      },
      transactionType: "ERC20"
    });
    if (!useAggregator) {
      const permit2ContractAbi = parseAbi([
        "function approve(address token, address spender, uint160 amount, uint48 expiration) external"
      ]);
      const data = encodeFunctionData({
        abi: permit2ContractAbi,
        functionName: "approve",
        args: [
          quote.from.address,
          UNIVERSALROUTER_CONTRACT_ADDRESS,
          BigInt(quote.fromAmount),
          2e13
          // The deadline where the approval is no longer valid - see https://docs.uniswap.org/contracts/permit2/reference/allowance-transfer
        ]
      });
      transactions.push({
        transaction: {
          to: PERMIT2_CONTRACT_ADDRESS,
          value: 0n,
          data
        },
        transactionType: "Permit2"
      });
    }
  }
  transactions.push({
    transaction: {
      to: transaction.to,
      value: transaction.value,
      data: transaction.data
    },
    transactionType: "Swap"
  });
  if (chainId !== base.id) {
    await switchChainAsync({ chainId: base.id });
  }
  await sendSwapTransactions({
    config,
    isSponsored,
    paymaster,
    sendCallsAsync,
    sendTransactionAsync,
    transactions,
    updateLifecycleStatus,
    walletCapabilities
  });
}
export {
  processSwapTransaction
};
//# sourceMappingURL=processSwapTransaction.js.map
