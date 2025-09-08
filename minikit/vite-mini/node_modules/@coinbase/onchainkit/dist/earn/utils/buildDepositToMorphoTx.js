import { MORPHO_VAULT_ABI } from "../abis/morpho.js";
import { encodeFunctionData, erc20Abi } from "viem";
function buildDepositToMorphoTx({
  vaultAddress,
  tokenAddress,
  amount,
  recipientAddress
}) {
  const approveTxData = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [vaultAddress, amount]
  });
  const depositTxData = encodeFunctionData({
    abi: MORPHO_VAULT_ABI,
    functionName: "deposit",
    args: [amount, recipientAddress]
  });
  return [
    {
      to: tokenAddress,
      data: approveTxData
    },
    {
      to: vaultAddress,
      data: depositTxData
    }
  ];
}
export {
  buildDepositToMorphoTx
};
//# sourceMappingURL=buildDepositToMorphoTx.js.map
