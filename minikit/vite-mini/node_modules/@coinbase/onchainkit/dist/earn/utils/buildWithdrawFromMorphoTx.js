import { MORPHO_VAULT_ABI } from "../abis/morpho.js";
import { encodeFunctionData } from "viem";
function buildWithdrawFromMorphoTx({
  vaultAddress,
  amount,
  recipientAddress
}) {
  const withdrawTxData = encodeFunctionData({
    abi: MORPHO_VAULT_ABI,
    functionName: "withdraw",
    args: [amount, recipientAddress, recipientAddress]
  });
  return [
    {
      to: vaultAddress,
      data: withdrawTxData
    }
  ];
}
export {
  buildWithdrawFromMorphoTx
};
//# sourceMappingURL=buildWithdrawFromMorphoTx.js.map
