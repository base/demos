import { isHex, type TransactionRequest } from "viem";
import type { RpcRequestArgs } from "@/types";
import { rpcErrors } from "@metamask/rpc-errors";

/**
 * Calls the RPC with a given request
 * @param request The request to make to the RPC.
 * @param rpcUrl The url of the RPC.
 * @returns Response from the RPC call.
 */
export const fetchRpcRequest = async (
  request: RpcRequestArgs,
  rpcUrl: string,
) => {
  const requestBody = {
    ...request,
    id: window?.crypto?.randomUUID(),
    jsonrpc: "2.0",
  };
  const res = await window.fetch(rpcUrl, {
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
  });
  const { result, error } = await res.json();
  if (error) {
    throw error;
  }

  return result;
};

/**
 * Validates the RPC request arguments
 * Valid request args are defined here: https://eips.ethereum.org/EIPS/eip-1193#request
 * @param args The request arguments to validate.
 * @returns An error object if the arguments are invalid, otherwise undefined.
 */
export function validateRpcRequestArgs(
  args: unknown,
): asserts args is RpcRequestArgs {
  if (!args || typeof args !== "object" || Array.isArray(args)) {
    throw rpcErrors.invalidParams({
      message: "Expected a single, non-array, object argument.",
    });
  }

  const { method, params } = args as RpcRequestArgs;

  if (typeof method !== "string" || method.length === 0) {
    throw rpcErrors.invalidParams({
      message: "'args.method' must be a non-empty string.",
    });
  }

  if (
    params !== undefined &&
    !Array.isArray(params) &&
    (typeof params !== "object" || params === null)
  ) {
    throw rpcErrors.invalidParams({
      message: "'args.params' must be an object or array if provided.",
    });
  }
}

/**
 * Converts specific tx request values from hex to BigInt to align with Viem types.
 * @param tx The raw transaction request object.
 * @returns The raw transaction object with certain fields converted to BigInts
 */
export function convertSendValuesToBigInt(
  tx: TransactionRequest,
): TransactionRequest {
  const FIELDS_TO_NORMALIZE: Array<
    keyof Pick<
      TransactionRequest,
      "value" | "gas" | "gasPrice" | "maxPriorityFeePerGas" | "maxFeePerGas"
    >
  > = ["value", "gas", "gasPrice", "maxPriorityFeePerGas", "maxFeePerGas"];

  const normalized = { ...tx };

  for (const field of FIELDS_TO_NORMALIZE) {
    if (!(field in tx)) {
      continue;
    }

    const value = tx[field];

    if (typeof value === "bigint") {
      continue;
    }

    if (isHex(value)) {
      normalized[field] = BigInt(value);
    }
  }

  return normalized;
}
