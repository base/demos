import { ContractFunctionParameters } from 'viem';
import { Call, UseSendWalletTransactionsParams } from '../types';
/**
 * Sends transactions to the wallet using the appropriate hook based on Transaction props and wallet capabilities
 */
export declare const useSendWalletTransactions: ({ capabilities, sendCallAsync, sendCallsAsync, walletCapabilities, }: UseSendWalletTransactionsParams) => (transactions?: Call[] | ContractFunctionParameters[] | Promise<Call[]> | Promise<ContractFunctionParameters[]> | Array<Call | ContractFunctionParameters>) => Promise<void>;
//# sourceMappingURL=useSendWalletTransactions.d.ts.map