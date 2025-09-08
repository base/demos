import type { Config, GetTransactionConfirmationsErrorType, ResolvedRegister } from '@wagmi/core';
import { type GetTransactionConfirmationsData, type GetTransactionConfirmationsOptions, type GetTransactionConfirmationsQueryFnData, type GetTransactionConfirmationsQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseTransactionConfirmationsParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = GetTransactionConfirmationsData> = GetTransactionConfirmationsOptions<config, chainId> & ConfigParameter<config> & QueryParameter<GetTransactionConfirmationsQueryFnData, GetTransactionConfirmationsErrorType, selectData, GetTransactionConfirmationsQueryKey<config, chainId>>;
export type UseTransactionConfirmationsReturnType<selectData = GetTransactionConfirmationsData> = UseQueryReturnType<selectData, GetTransactionConfirmationsErrorType>;
/** https://wagmi.sh/react/api/hooks/useTransactionConfirmations */
export declare function useTransactionConfirmations<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = GetTransactionConfirmationsData>(parameters?: UseTransactionConfirmationsParameters<config, chainId, selectData>): UseTransactionConfirmationsReturnType<selectData>;
//# sourceMappingURL=useTransactionConfirmations.d.ts.map