import { encodeFunctionData, erc20Abi } from "viem";
function buildSendTransaction({
  recipientAddress,
  tokenAddress,
  amount
}) {
  if (!tokenAddress) {
    return {
      to: recipientAddress,
      data: "0x",
      value: amount
    };
  }
  try {
    const transferCallData = encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [recipientAddress, amount]
    });
    return {
      to: tokenAddress,
      data: transferCallData
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      code: "AmBSeTx01",
      // Api Module Build Send Transaction Error 01
      error: message,
      message: "Could not build transfer transaction"
    };
  }
}
export {
  buildSendTransaction
};
//# sourceMappingURL=buildSendTransaction.js.map
