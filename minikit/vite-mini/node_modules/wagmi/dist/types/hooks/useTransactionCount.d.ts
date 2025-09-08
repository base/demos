import type { Config, GetTransactionCountErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import type { GetTransactionCountQueryFnData } from '@wagmi/core/query';
import { type GetTransactionCountData, type GetTransactionCountOptions, type GetTransactionCountQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseTransactionCountParameters<config extends Config = Config, selectData = GetTransactionCountData> = Compute<GetTransactionCountOptions<config> & ConfigParameter<config> & QueryParameter<GetTransactionCountQueryFnData, GetTransactionCountErrorType, selectData, GetTransactionCountQueryKey<config>>>;
export type UseTransactionCountReturnType<selectData = GetTransactionCountData> = UseQueryReturnType<selectData, GetTransactionCountErrorType>;
/** https://wagmi.sh/react/api/hooks/useTransactionCount */
export declare function useTransactionCount<config extends Config = ResolvedRegister['config'], selectData = GetTransactionCountData>(parameters?: UseTransactionCountParameters<config, selectData>): UseTransactionCountReturnType<selectData>;
//# sourceMappingURL=useTransactionCount.d.ts.map