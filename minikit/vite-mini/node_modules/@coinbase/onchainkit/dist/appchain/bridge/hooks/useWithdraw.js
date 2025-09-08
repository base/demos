'use client';
import { useAnalytics } from "../../../core/analytics/hooks/useAnalytics.js";
import { AppchainEvent } from "../../../core/analytics/types.js";
import { useState, useCallback } from "react";
import { keccak256, parseEther, parseUnits, erc20Abi } from "viem";
import { getWithdrawalHashStorageSlot, getWithdrawals } from "viem/op-stack";
import { useAccount, useSwitchChain, useWriteContract, useConfig } from "wagmi";
import { getProof, getBlock, waitForTransactionReceipt, readContract } from "wagmi/actions";
import { OptimismPortalABI, L2OutputOracleABI, L2_TO_L1_MESSAGE_PASSER_ABI, StandardBridgeABI } from "../abi.js";
import { APPCHAIN_L2_TO_L1_MESSAGE_PASSER_ADDRESS, OUTPUT_ROOT_PROOF_VERSION, EXTRA_DATA, MIN_GAS_LIMIT, APPCHAIN_BRIDGE_ADDRESS } from "../constants.js";
import { getOutput } from "../utils/getOutput.js";
import { isUserRejectedRequestError } from "../utils/isUserRejectedRequestError.js";
import { maybeAddProofNode } from "../utils/maybeAddProofNode.js";
const useWithdraw = ({
  config,
  chain,
  bridgeParams
}) => {
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, data } = useWriteContract();
  const wagmiConfig = useConfig();
  const [withdrawStatus, setWithdrawStatus] = useState("idle");
  const [withdrawal, setWithdrawal] = useState(null);
  const [finalizedWithdrawalTxHash, setFinalizedWithdrawalTxHash] = useState(void 0);
  const { sendAnalytics } = useAnalytics();
  const resetWithdrawStatus = useCallback(() => {
    setWithdrawStatus("idle");
    setWithdrawal(null);
  }, []);
  const withdraw = async () => {
    if (!bridgeParams.recipient) {
      throw new Error("Recipient is required");
    }
    sendAnalytics(AppchainEvent.AppchainBridgeWithdrawInitiated, {
      amount: bridgeParams.amount,
      tokenAddress: bridgeParams.token.address,
      recipient: bridgeParams.recipient
    });
    setWithdrawStatus("withdrawPending");
    try {
      if (chainId !== config.chainId) {
        await switchChainAsync({ chainId: config.chainId });
      }
      let transactionHash = "0x";
      if (bridgeParams.token.isCustomGasToken) {
        transactionHash = await writeContractAsync({
          abi: L2_TO_L1_MESSAGE_PASSER_ABI,
          functionName: "initiateWithdrawal",
          args: [bridgeParams.recipient, BigInt(MIN_GAS_LIMIT), EXTRA_DATA],
          address: APPCHAIN_L2_TO_L1_MESSAGE_PASSER_ADDRESS,
          chainId: config.chainId,
          value: parseEther(bridgeParams.amount)
        });
      } else if (bridgeParams.token.address === "") {
        transactionHash = await writeContractAsync({
          abi: StandardBridgeABI,
          functionName: "bridgeETHTo",
          args: [bridgeParams.recipient, MIN_GAS_LIMIT, EXTRA_DATA],
          address: APPCHAIN_BRIDGE_ADDRESS,
          value: parseEther(bridgeParams.amount),
          chainId: config.chainId
        });
      } else {
        if (!bridgeParams.token.remoteToken) {
          throw new Error("Remote token is required");
        }
        const formattedAmount = parseUnits(
          bridgeParams.amount,
          bridgeParams.token.decimals
        );
        const approveTx = await writeContractAsync({
          abi: erc20Abi,
          functionName: "approve",
          args: [APPCHAIN_BRIDGE_ADDRESS, formattedAmount],
          address: bridgeParams.token.address,
          chainId: config.chainId
        });
        await waitForTransactionReceipt(wagmiConfig, {
          hash: approveTx,
          confirmations: 1
        });
        transactionHash = await writeContractAsync({
          abi: StandardBridgeABI,
          functionName: "bridgeERC20To",
          args: [
            bridgeParams.token.remoteToken,
            bridgeParams.token.address,
            bridgeParams.recipient,
            formattedAmount,
            MIN_GAS_LIMIT,
            EXTRA_DATA
          ],
          address: APPCHAIN_BRIDGE_ADDRESS,
          chainId: config.chainId
        });
      }
      sendAnalytics(AppchainEvent.AppchainBridgeWithdrawSuccess, {
        amount: bridgeParams.amount,
        tokenAddress: bridgeParams.token.address,
        recipient: bridgeParams.recipient
      });
      setWithdrawStatus("withdrawSuccess");
      return transactionHash;
    } catch (error) {
      if (isUserRejectedRequestError(error)) {
        console.error("User rejected request");
        setWithdrawStatus("withdrawRejected");
      } else {
        console.error("Error", error);
        setWithdrawStatus("error");
        sendAnalytics(AppchainEvent.AppchainBridgeWithdrawFailure, {
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  };
  const waitForWithdrawal = async (txHash) => {
    const hash = txHash || data;
    if (!hash) {
      return;
    }
    const withdrawalReceipt = await waitForTransactionReceipt(wagmiConfig, {
      // By default, use the withdrawal hash from Wagmi hook
      // If the user has resumed a withdrawal transaction, use the txHash provided
      hash,
      confirmations: 1,
      chainId: config.chainId
    });
    const pollInterval = 1e3;
    const maxAttempts = 60;
    let attempts = 0;
    while (attempts < maxAttempts) {
      const latestBlockNumber = await readContract(wagmiConfig, {
        address: config.contracts.l2OutputOracle,
        abi: L2OutputOracleABI,
        functionName: "latestBlockNumber",
        chainId: chain.id
      });
      if (latestBlockNumber >= withdrawalReceipt.blockNumber) {
        setWithdrawStatus("claimReady");
        const [_withdrawal] = getWithdrawals(withdrawalReceipt);
        setWithdrawal([_withdrawal]);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      attempts++;
    }
    sendAnalytics(AppchainEvent.AppchainBridgeWaitForClaimFailure, {
      transactionHash: txHash || data || "0x"
    });
  };
  const proveAndFinalizeWithdrawal = async () => {
    if (!withdrawal || withdrawal.length === 0) {
      console.error("no withdrawals to prove");
      return;
    }
    setWithdrawStatus("claimPending");
    const output = await getOutput({
      config,
      chain,
      wagmiConfig
    });
    const slot = getWithdrawalHashStorageSlot({
      withdrawalHash: withdrawal[0].withdrawalHash
    });
    const [proof, block] = await Promise.all([
      // On the L2ToL1MessagePasser on the appchain
      getProof(wagmiConfig, {
        address: APPCHAIN_L2_TO_L1_MESSAGE_PASSER_ADDRESS,
        storageKeys: [slot],
        blockNumber: output.l2BlockNumber,
        chainId: config.chainId
      }),
      getBlock(wagmiConfig, {
        blockNumber: output.l2BlockNumber,
        chainId: config.chainId
      })
    ]);
    const args = {
      l2OutputIndex: output.outputIndex,
      outputRootProof: {
        version: OUTPUT_ROOT_PROOF_VERSION,
        stateRoot: block.stateRoot,
        messagePasserStorageRoot: proof.storageHash,
        latestBlockhash: block.hash
      },
      withdrawalProof: maybeAddProofNode(
        keccak256(slot),
        proof.storageProof[0].proof
      ),
      withdrawal: withdrawal[0]
    };
    try {
      if (chainId !== chain.id) {
        await switchChainAsync({ chainId: chain.id });
      }
      const _finalizedWithdrawalTxHash = await writeContractAsync({
        abi: OptimismPortalABI,
        address: config.contracts.optimismPortal,
        functionName: "proveAndFinalizeWithdrawalTransaction",
        args: [
          withdrawal[0],
          args.l2OutputIndex,
          args.outputRootProof,
          args.withdrawalProof
        ],
        chainId: chain.id
      });
      await waitForTransactionReceipt(wagmiConfig, {
        hash: _finalizedWithdrawalTxHash,
        confirmations: 1,
        chainId: chain.id
      });
      setFinalizedWithdrawalTxHash(_finalizedWithdrawalTxHash);
      setWithdrawStatus("claimSuccess");
      sendAnalytics(AppchainEvent.AppchainBridgeClaimSuccess, {
        amount: bridgeParams.amount,
        tokenAddress: bridgeParams.token.address
      });
    } catch (error) {
      if (isUserRejectedRequestError(error)) {
        console.error("User rejected request");
        setWithdrawStatus("claimRejected");
      } else {
        setWithdrawStatus("error");
        sendAnalytics(AppchainEvent.AppchainBridgeClaimFailure, {
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  };
  return {
    withdraw,
    withdrawStatus,
    waitForWithdrawal,
    proveAndFinalizeWithdrawal,
    finalizedWithdrawalTxHash,
    resetWithdrawStatus
  };
};
export {
  useWithdraw
};
//# sourceMappingURL=useWithdraw.js.map
