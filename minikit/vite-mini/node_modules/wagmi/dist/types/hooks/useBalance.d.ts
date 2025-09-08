import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import type { GetBalanceQueryFnData } from '@wagmi/core/query';
import { type GetBalanceData, type GetBalanceOptions, type GetBalanceQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseBalanceParameters<config extends Config = Config, selectData = GetBalanceData> = Compute<GetBalanceOptions<config> & ConfigParameter<config> & QueryParameter<GetBalanceQueryFnData, GetBalanceErrorType, selectData, GetBalanceQueryKey<config>>>;
export type UseBalanceReturnType<selectData = GetBalanceData> = UseQueryReturnType<selectData, GetBalanceErrorType>;
/** https://wagmi.sh/react/api/hooks/useBalance */
export declare function useBalance<config extends Config = ResolvedRegister['config'], selectData = GetBalanceData>(parameters?: UseBalanceParameters<config, selectData>): UseBalanceReturnType<selectData>;
//# sourceMappingURL=useBalance.d.ts.map