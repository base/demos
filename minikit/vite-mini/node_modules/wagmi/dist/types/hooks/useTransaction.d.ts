import type { Config, GetTransactionErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetTransactionData, type GetTransactionOptions, type GetTransactionQueryFnData, type GetTransactionQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseTransactionParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetTransactionData<config, chainId>> = Compute<GetTransactionOptions<config, chainId> & ConfigParameter<config> & QueryParameter<GetTransactionQueryFnData<config, chainId>, GetTransactionErrorType, selectData, GetTransactionQueryKey<config, chainId>>>;
export type UseTransactionReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetTransactionData<config, chainId>> = UseQueryReturnType<selectData, GetTransactionErrorType>;
/** https://wagmi.sh/react/api/hooks/useTransaction */
export declare function useTransaction<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetTransactionData<config, chainId>>(parameters?: UseTransactionParameters<config, chainId, selectData>): UseTransactionReturnType<config, chainId, selectData>;
//# sourceMappingURL=useTransaction.d.ts.map