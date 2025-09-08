'use client';
import { useMorphoVault } from "./useMorphoVault.js";
import { buildWithdrawFromMorphoTx } from "../utils/buildWithdrawFromMorphoTx.js";
import { parseUnits } from "viem";
function useBuildWithdrawFromMorphoTx({
  vaultAddress,
  amount,
  recipientAddress,
  tokenDecimals
}) {
  const { asset, balance, vaultDecimals } = useMorphoVault({
    vaultAddress,
    recipientAddress
  });
  const amountIsGreaterThanBalance = Number(amount) > Number(balance);
  if (!asset || balance === void 0 || !vaultDecimals || !recipientAddress || amountIsGreaterThanBalance || tokenDecimals === void 0) {
    return {
      calls: []
    };
  }
  const parsedAmount = parseUnits(amount, tokenDecimals);
  const calls = buildWithdrawFromMorphoTx({
    recipientAddress,
    vaultAddress,
    amount: parsedAmount
  });
  return {
    calls
  };
}
export {
  useBuildWithdrawFromMorphoTx
};
//# sourceMappingURL=useBuildWithdrawFromMorphoTx.js.map
