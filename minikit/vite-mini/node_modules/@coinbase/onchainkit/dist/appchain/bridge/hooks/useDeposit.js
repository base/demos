'use client';
import { useAnalytics } from "../../../core/analytics/hooks/useAnalytics.js";
import { AppchainEvent } from "../../../core/analytics/types.js";
import { useState, useCallback } from "react";
import { parseEther, parseUnits } from "viem";
import { useWriteContract, useSwitchChain, useAccount, useConfig } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { StandardBridgeABI, ERC20ABI, OptimismPortalABI } from "../abi.js";
import { MIN_GAS_LIMIT, EXTRA_DATA } from "../constants.js";
import { isUserRejectedRequestError } from "../utils/isUserRejectedRequestError.js";
function useDeposit() {
  const { writeContractAsync, data } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const { chainId } = useAccount();
  const wagmiConfig = useConfig();
  const [status, setStatus] = useState("idle");
  const { sendAnalytics } = useAnalytics();
  const resetDepositStatus = useCallback(() => {
    setStatus("idle");
  }, []);
  const deposit = async ({ config, from, bridgeParams }) => {
    if (!bridgeParams.recipient) {
      throw new Error("Recipient is required");
    }
    if (chainId !== from.id) {
      await switchChainAsync({ chainId: from.id });
    }
    sendAnalytics(AppchainEvent.AppchainBridgeDepositInitiated, {
      amount: bridgeParams.amount,
      tokenAddress: bridgeParams.token.address,
      recipient: bridgeParams.recipient
    });
    setStatus("depositPending");
    try {
      if (bridgeParams.token.address === "") {
        const txHash = await writeContractAsync({
          abi: StandardBridgeABI,
          functionName: "bridgeETHTo",
          args: [bridgeParams.recipient, MIN_GAS_LIMIT, EXTRA_DATA],
          address: config.contracts.l1StandardBridge,
          value: parseEther(bridgeParams.amount),
          chainId: from.id
        });
        await waitForTransactionReceipt(wagmiConfig, {
          hash: txHash,
          confirmations: 1,
          chainId: from.id
        });
      } else {
        if (!bridgeParams.token.remoteToken) {
          throw new Error("Remote token address is required for ERC-20 tokens");
        }
        const formattedAmount = parseUnits(
          bridgeParams.amount,
          bridgeParams.token.decimals
        );
        const bridgeAddress = bridgeParams.token.isCustomGasToken ? config.contracts.optimismPortal : config.contracts.l1StandardBridge;
        const approveTx = await writeContractAsync({
          abi: ERC20ABI,
          functionName: "approve",
          args: [bridgeAddress, formattedAmount],
          address: bridgeParams.token.address
        });
        await waitForTransactionReceipt(wagmiConfig, {
          hash: approveTx,
          confirmations: 1,
          chainId: from.id
        });
        let bridgeTxHash;
        if (bridgeParams.token.isCustomGasToken) {
          bridgeTxHash = await writeContractAsync({
            abi: OptimismPortalABI,
            functionName: "depositERC20Transaction",
            args: [
              bridgeParams.recipient,
              formattedAmount,
              formattedAmount,
              BigInt(MIN_GAS_LIMIT),
              false,
              EXTRA_DATA
            ],
            address: bridgeAddress
          });
        } else {
          bridgeTxHash = await writeContractAsync({
            abi: StandardBridgeABI,
            functionName: "bridgeERC20To",
            args: [
              bridgeParams.token.address,
              bridgeParams.token.remoteToken,
              // TODO: manually calculate the salted address
              bridgeParams.recipient,
              formattedAmount,
              MIN_GAS_LIMIT,
              EXTRA_DATA
            ],
            address: bridgeAddress
          });
        }
        await waitForTransactionReceipt(wagmiConfig, {
          hash: bridgeTxHash,
          confirmations: 1,
          chainId: from.id
        });
      }
      sendAnalytics(AppchainEvent.AppchainBridgeDepositSuccess, {
        amount: bridgeParams.amount,
        tokenAddress: bridgeParams.token.address,
        recipient: bridgeParams.recipient
      });
      setStatus("depositSuccess");
    } catch (error) {
      if (isUserRejectedRequestError(error)) {
        console.error("User rejected request");
        setStatus("depositRejected");
      } else {
        setStatus("error");
        sendAnalytics(AppchainEvent.AppchainBridgeDepositFailure, {
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  };
  return {
    deposit,
    depositStatus: status,
    transactionHash: data,
    resetDepositStatus
  };
}
export {
  useDeposit
};
//# sourceMappingURL=useDeposit.js.map
