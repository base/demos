import type { Config, GetEnsTextErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetEnsTextData, type GetEnsTextOptions, type GetEnsTextQueryFnData, type GetEnsTextQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseEnsTextParameters<config extends Config = Config, selectData = GetEnsTextData> = Compute<GetEnsTextOptions<config> & ConfigParameter<config> & QueryParameter<GetEnsTextQueryFnData, GetEnsTextErrorType, selectData, GetEnsTextQueryKey<config>>>;
export type UseEnsTextReturnType<selectData = GetEnsTextData> = UseQueryReturnType<selectData, GetEnsTextErrorType>;
/** https://wagmi.sh/react/api/hooks/useEnsText */
export declare function useEnsText<config extends Config = ResolvedRegister['config'], selectData = GetEnsTextData>(parameters?: UseEnsTextParameters<config, selectData>): UseEnsTextReturnType<selectData>;
//# sourceMappingURL=useEnsText.d.ts.map