import type { Config, GetTokenErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetTokenData, type GetTokenOptions, type GetTokenQueryFnData, type GetTokenQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseTokenParameters<config extends Config = Config, selectData = GetTokenData> = Compute<GetTokenOptions<config> & ConfigParameter<config> & QueryParameter<GetTokenQueryFnData, GetTokenErrorType, selectData, GetTokenQueryKey<config>>>;
export type UseTokenReturnType<selectData = GetTokenData> = UseQueryReturnType<selectData, GetTokenErrorType>;
/**
 * @deprecated
 *
 * https://wagmi.sh/react/api/hooks/useToken
 */
export declare function useToken<config extends Config = ResolvedRegister['config'], selectData = GetTokenData>(parameters?: UseTokenParameters<config, selectData>): UseTokenReturnType<selectData>;
//# sourceMappingURL=useToken.d.ts.map