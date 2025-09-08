import type { Config, ResolvedRegister, WaitForTransactionReceiptErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type WaitForTransactionReceiptData, type WaitForTransactionReceiptOptions, type WaitForTransactionReceiptQueryFnData, type WaitForTransactionReceiptQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseWaitForTransactionReceiptParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = WaitForTransactionReceiptData<config, chainId>> = Compute<WaitForTransactionReceiptOptions<config, chainId> & ConfigParameter<config> & QueryParameter<WaitForTransactionReceiptQueryFnData<config, chainId>, WaitForTransactionReceiptErrorType, selectData, WaitForTransactionReceiptQueryKey<config, chainId>>>;
export type UseWaitForTransactionReceiptReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = WaitForTransactionReceiptData<config, chainId>> = UseQueryReturnType<selectData, WaitForTransactionReceiptErrorType>;
/** https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt */
export declare function useWaitForTransactionReceipt<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = WaitForTransactionReceiptData<config, chainId>>(parameters?: UseWaitForTransactionReceiptParameters<config, chainId, selectData>): UseWaitForTransactionReceiptReturnType<config, chainId, selectData>;
//# sourceMappingURL=useWaitForTransactionReceipt.d.ts.map