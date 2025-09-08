import { type GetEnsAvatarErrorType as viem_GetEnsAvatarErrorType, type GetEnsAvatarParameters as viem_GetEnsAvatarParameters, type GetEnsAvatarReturnType as viem_GetEnsAvatarReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetEnsAvatarParameters<config extends Config = Config> = Compute<viem_GetEnsAvatarParameters & ChainIdParameter<config>>;
export type GetEnsAvatarReturnType = viem_GetEnsAvatarReturnType;
export type GetEnsAvatarErrorType = viem_GetEnsAvatarErrorType;
/** https://wagmi.sh/core/api/actions/getEnsAvatar */
export declare function getEnsAvatar<config extends Config>(config: config, parameters: GetEnsAvatarParameters<config>): Promise<GetEnsAvatarReturnType>;
//# sourceMappingURL=getEnsAvatar.d.ts.map