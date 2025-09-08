import { type Address, type Hex } from 'viem';
import type { PayerInfo } from '../types.js';
/**
 * Encodes an ERC20 transfer call
 * @param recipient - The recipient address
 * @param amount - The amount in USDC (will be converted to 6 decimals)
 * @returns The encoded function data
 */
export declare function encodeTransferCall(recipient: string, amount: string): Hex;
/**
 * Builds the wallet_sendCalls request parameters
 * @param transferData - The encoded transfer call data
 * @param testnet - Whether to use testnet
 * @param payerInfo - Optional payer information configuration for data callbacks
 * @returns The request parameters for wallet_sendCalls
 */
export declare function buildSendCallsRequest(transferData: Hex, testnet: boolean, payerInfo?: PayerInfo): {
    version: string;
    chainId: 84532 | 8453;
    calls: {
        to: Address;
        data: `0x${string}`;
        value: Hex;
    }[];
    capabilities: Record<string, unknown>;
};
/**
 * Translates payment options into a wallet_sendCalls request
 * @param recipient - The recipient address
 * @param amount - The amount to send
 * @param testnet - Whether to use testnet
 * @param payerInfo - Optional payer information configuration for data callbacks
 * @returns The complete request parameters
 */
export declare function translatePaymentToSendCalls(recipient: string, amount: string, testnet: boolean, payerInfo?: PayerInfo): {
    version: string;
    chainId: 84532 | 8453;
    calls: {
        to: Address;
        data: `0x${string}`;
        value: Hex;
    }[];
    capabilities: Record<string, unknown>;
};
//# sourceMappingURL=translatePayment.d.ts.map