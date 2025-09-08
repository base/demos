import { type GetEnsTextErrorType as viem_GetEnsTextErrorType, type GetEnsTextParameters as viem_GetEnsTextParameters, type GetEnsTextReturnType as viem_GetEnsTextReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetEnsTextParameters<config extends Config = Config> = Compute<viem_GetEnsTextParameters & ChainIdParameter<config>>;
export type GetEnsTextReturnType = viem_GetEnsTextReturnType;
export type GetEnsTextErrorType = viem_GetEnsTextErrorType;
/** https://wagmi.sh/core/api/actions/getEnsText */
export declare function getEnsText<config extends Config>(config: config, parameters: GetEnsTextParameters<config>): Promise<GetEnsTextReturnType>;
//# sourceMappingURL=getEnsText.d.ts.map