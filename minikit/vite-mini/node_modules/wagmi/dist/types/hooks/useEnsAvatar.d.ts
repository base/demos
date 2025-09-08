import type { Config, GetEnsAvatarErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetEnsAvatarData, type GetEnsAvatarOptions, type GetEnsAvatarQueryFnData, type GetEnsAvatarQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseEnsAvatarParameters<config extends Config = Config, selectData = GetEnsAvatarData> = Compute<GetEnsAvatarOptions<config> & ConfigParameter<config> & QueryParameter<GetEnsAvatarQueryFnData, GetEnsAvatarErrorType, selectData, GetEnsAvatarQueryKey<config>>>;
export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> = UseQueryReturnType<selectData, GetEnsAvatarErrorType>;
/** https://wagmi.sh/react/api/hooks/useEnsAvatar */
export declare function useEnsAvatar<config extends Config = ResolvedRegister['config'], selectData = GetEnsAvatarData>(parameters?: UseEnsAvatarParameters<config, selectData>): UseEnsAvatarReturnType<selectData>;
//# sourceMappingURL=useEnsAvatar.d.ts.map