import type { Config, GetBlockTransactionCountErrorType, ResolvedRegister } from '@wagmi/core';
import type { UnionCompute } from '@wagmi/core/internal';
import { type GetBlockTransactionCountData, type GetBlockTransactionCountOptions, type GetBlockTransactionCountQueryFnData, type GetBlockTransactionCountQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseBlockTransactionCountParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetBlockTransactionCountData> = UnionCompute<GetBlockTransactionCountOptions<config, chainId> & ConfigParameter<config> & QueryParameter<GetBlockTransactionCountQueryFnData, GetBlockTransactionCountErrorType, selectData, GetBlockTransactionCountQueryKey<config, chainId>>>;
export type UseBlockTransactionCountReturnType<selectData = GetBlockTransactionCountData> = UseQueryReturnType<selectData, GetBlockTransactionCountErrorType>;
/** https://wagmi.sh/react/api/hooks/useBlockTransactionCount */
export declare function useBlockTransactionCount<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetBlockTransactionCountData>(parameters?: UseBlockTransactionCountParameters<config, chainId, selectData>): UseBlockTransactionCountReturnType<selectData>;
//# sourceMappingURL=useBlockTransactionCount.d.ts.map