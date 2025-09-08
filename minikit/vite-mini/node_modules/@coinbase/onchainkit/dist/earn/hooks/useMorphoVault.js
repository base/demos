'use client';
import { MORPHO_VAULT_ABI } from "../abis/morpho.js";
import { MORPHO_TOKEN_BASE_ADDRESS } from "../constants.js";
import calculateMorphoRewards from "../utils/calculateMorphoRewards.js";
import { fetchMorphoApy } from "../utils/fetchMorphoApy.js";
import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "viem";
import { base } from "viem/chains";
import { useReadContracts, useReadContract } from "wagmi";
function useMorphoVault({
  vaultAddress,
  recipientAddress
}) {
  var _a, _b, _c, _d;
  const { data, status } = useReadContracts({
    contracts: [
      {
        abi: MORPHO_VAULT_ABI,
        address: vaultAddress,
        functionName: "asset",
        chainId: base.id
        // Only Base is supported
      },
      {
        abi: MORPHO_VAULT_ABI,
        address: vaultAddress,
        functionName: "name",
        chainId: base.id
        // Only Base is supported
      },
      {
        abi: MORPHO_VAULT_ABI,
        address: vaultAddress,
        functionName: "decimals",
        chainId: base.id
        // Only Base is supported
      }
    ],
    query: {
      enabled: !!vaultAddress
    }
  });
  const assetAddress = data == null ? void 0 : data[0].result;
  const vaultName = data == null ? void 0 : data[1].result;
  const vaultDecimals = data == null ? void 0 : data[2].result;
  const {
    data: balance,
    status: balanceStatus,
    refetch
  } = useReadContract({
    abi: MORPHO_VAULT_ABI,
    address: vaultAddress,
    functionName: "maxWithdraw",
    args: [recipientAddress],
    chainId: base.id,
    // Only Base is supported
    query: {
      enabled: !!vaultAddress && !!recipientAddress
    }
  });
  const { data: vaultData, error } = useQuery({
    queryKey: ["morpho-apy", vaultAddress],
    queryFn: () => fetchMorphoApy(vaultAddress)
  });
  const morphoApr = (vaultData == null ? void 0 : vaultData.state) ? calculateMorphoRewards(vaultData == null ? void 0 : vaultData.state) : 0;
  const formattedBalance = balance && (vaultData == null ? void 0 : vaultData.asset.decimals) ? formatUnits(balance, vaultData == null ? void 0 : vaultData.asset.decimals) : void 0;
  const formattedDeposits = (vaultData == null ? void 0 : vaultData.state.totalAssets) && vaultData.asset.decimals ? formatUnits(
    BigInt(vaultData == null ? void 0 : vaultData.state.totalAssets),
    vaultData.asset.decimals
  ) : void 0;
  const formattedLiquidity = (vaultData == null ? void 0 : vaultData.liquidity.underlying) && vaultData.asset.decimals ? formatUnits(
    BigInt(vaultData == null ? void 0 : vaultData.liquidity.underlying),
    vaultData.asset.decimals
  ) : void 0;
  return {
    status,
    error,
    /** Balance is the amount of the underlying asset that the user has in the vault */
    balance: formattedBalance,
    balanceStatus,
    refetchBalance: refetch,
    asset: {
      address: assetAddress,
      symbol: vaultData == null ? void 0 : vaultData.symbol,
      decimals: vaultData == null ? void 0 : vaultData.asset.decimals
    },
    vaultName,
    vaultDecimals,
    totalApy: (_a = vaultData == null ? void 0 : vaultData.state) == null ? void 0 : _a.netApy,
    nativeApy: (_b = vaultData == null ? void 0 : vaultData.state) == null ? void 0 : _b.netApyWithoutRewards,
    vaultFee: (_c = vaultData == null ? void 0 : vaultData.state) == null ? void 0 : _c.fee,
    deposits: formattedDeposits,
    liquidity: formattedLiquidity,
    rewards: [
      {
        asset: MORPHO_TOKEN_BASE_ADDRESS,
        assetName: "MORPHO",
        apy: morphoApr
      },
      ...((_d = vaultData == null ? void 0 : vaultData.state) == null ? void 0 : _d.rewards.map((reward) => ({
        asset: reward.asset.address,
        assetName: reward.asset.name,
        apy: reward.supplyApr
      }))) || []
    ]
  };
}
export {
  useMorphoVault
};
//# sourceMappingURL=useMorphoVault.js.map
