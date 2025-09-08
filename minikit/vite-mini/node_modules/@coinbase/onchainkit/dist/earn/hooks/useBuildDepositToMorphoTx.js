'use client';
import { useMorphoVault } from "./useMorphoVault.js";
import { buildDepositToMorphoTx } from "../utils/buildDepositToMorphoTx.js";
import { parseUnits } from "viem";
function useBuildDepositToMorphoTx({
  vaultAddress,
  recipientAddress,
  amount
}) {
  const { asset } = useMorphoVault({
    vaultAddress,
    recipientAddress
  });
  if (!asset || !asset.decimals || !recipientAddress) {
    return {
      calls: []
    };
  }
  const parsedAmount = parseUnits(amount, asset.decimals);
  const calls = buildDepositToMorphoTx({
    recipientAddress,
    vaultAddress,
    tokenAddress: asset.address,
    amount: parsedAmount
  });
  return {
    calls
  };
}
export {
  useBuildDepositToMorphoTx
};
//# sourceMappingURL=useBuildDepositToMorphoTx.js.map
