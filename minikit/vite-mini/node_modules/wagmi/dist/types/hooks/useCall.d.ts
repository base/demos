import type { CallErrorType, Config, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import type { CallQueryFnData } from '@wagmi/core/query';
import { type CallData, type CallOptions, type CallQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseCallParameters<config extends Config = Config, selectData = CallData> = Compute<CallOptions<config> & ConfigParameter<config> & QueryParameter<CallQueryFnData, CallErrorType, selectData, CallQueryKey<config>>>;
export type UseCallReturnType<selectData = CallData> = UseQueryReturnType<selectData, CallErrorType>;
/** https://wagmi.sh/react/api/hooks/useCall */
export declare function useCall<config extends Config = ResolvedRegister['config'], selectData = CallData>(parameters?: UseCallParameters<config, selectData>): UseCallReturnType<selectData>;
//# sourceMappingURL=useCall.d.ts.map