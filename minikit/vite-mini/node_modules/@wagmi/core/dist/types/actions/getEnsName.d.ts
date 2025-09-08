import { type GetEnsNameErrorType as viem_GetEnsNameErrorType, type GetEnsNameParameters as viem_GetEnsNameParameters, type GetEnsNameReturnType as viem_GetEnsNameReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetEnsNameParameters<config extends Config = Config> = Compute<viem_GetEnsNameParameters & ChainIdParameter<config>>;
export type GetEnsNameReturnType = viem_GetEnsNameReturnType;
export type GetEnsNameErrorType = viem_GetEnsNameErrorType;
/** https://wagmi.sh/core/api/actions/getEnsName */
export declare function getEnsName<config extends Config>(config: config, parameters: GetEnsNameParameters<config>): Promise<GetEnsNameReturnType>;
//# sourceMappingURL=getEnsName.d.ts.map