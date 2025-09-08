import type { Config, GetCallsStatusErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetCallsStatusData, type GetCallsStatusOptions, type GetCallsStatusQueryFnData, type GetCallsStatusQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseCallsStatusParameters<config extends Config = Config, selectData = GetCallsStatusData> = Compute<GetCallsStatusOptions & ConfigParameter<config> & QueryParameter<GetCallsStatusQueryFnData, GetCallsStatusErrorType, selectData, GetCallsStatusQueryKey>>;
export type UseCallsStatusReturnType<selectData = GetCallsStatusData> = UseQueryReturnType<selectData, GetCallsStatusErrorType>;
/** https://wagmi.sh/react/api/hooks/useCallsStatus */
export declare function useCallsStatus<config extends Config = ResolvedRegister['config'], selectData = GetCallsStatusData>(parameters: UseCallsStatusParameters<config, selectData>): UseCallsStatusReturnType<selectData>;
//# sourceMappingURL=useCallsStatus.d.ts.map