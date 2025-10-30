"use client";

import { useState } from "react";
import { useSendCalls } from "wagmi";
import { encodeFunctionData, parseUnits } from "viem";
import { baseSepolia } from "wagmi/chains";

// USDC contract address on Base Sepolia
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

// ERC20 ABI for the transfer function
const erc20Abi = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export function BatchTransactions() {
  const { sendCalls, data, isPending, isSuccess, error } = useSendCalls();
  const [amount1, setAmount1] = useState("1");
  const [amount2, setAmount2] = useState("1");
  const [usePaymaster, setUsePaymaster] = useState(false);

  async function handleBatchTransfer() {
    try {
      // Encode the first transfer call
      const call1Data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [
          "0x2211d1D0020DAEA8039E46Cf1367962070d77DA9",
          parseUnits(amount1, 6), // USDC has 6 decimals
        ],
      });

      // Encode the second transfer call
      const call2Data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [
          "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
          parseUnits(amount2, 6), // USDC has 6 decimals
        ],
      });

      // Prepare capabilities object if paymaster is enabled
      const capabilities = usePaymaster
        ? {
            paymasterService: {
              url: process.env.NEXT_PUBLIC_PAYMASTER_URL || "https://api.developer.coinbase.com/rpc/v1/base-sepolia",
            },
          }
        : undefined;

      // Send the batch of calls
      sendCalls({
        calls: [
          {
            to: USDC_ADDRESS,
            data: call1Data,
          },
          {
            to: USDC_ADDRESS,
            data: call2Data,
          },
        ],
        chainId: baseSepolia.id,
        capabilities,
      });
    } catch (err) {
      console.error("Error batching transactions:", err);
    }
  }

  return (
    <div>
      <h2>Batch USDC Transfers</h2>

      <div>
        <div>
          <label>Amount 1 (USDC):</label>
          <input
            type="number"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
            placeholder="1"
            step="0.000001"
            min="0"
          />
        </div>

        <div>
          <label>Amount 2 (USDC):</label>
          <input
            type="number"
            value={amount2}
            onChange={(e) => setAmount2(e.target.value)}
            placeholder="1"
            step="0.000001"
            min="0"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={usePaymaster}
              onChange={(e) => setUsePaymaster(e.target.checked)}
            />
            Use Paymaster (sponsor gas fees)
          </label>
        </div>

        <button onClick={handleBatchTransfer} disabled={isPending}>
          {isPending ? "Sending..." : "Send Batch Transfer"}
        </button>
      </div>

      {isPending && <div>Transaction pending...</div>}

      {isSuccess && data && (
        <div>
          <p>Batch sent successfully!</p>
          <p>Batch ID: {data.id}</p>
        </div>
      )}

      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

