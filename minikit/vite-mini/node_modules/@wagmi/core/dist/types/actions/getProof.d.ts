import { type GetProofErrorType as viem_GetProofErrorType, type GetProofParameters as viem_GetProofParameters, type GetProofReturnType as viem_GetProofReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetProofParameters<config extends Config = Config> = Compute<viem_GetProofParameters & ChainIdParameter<config>>;
export type GetProofReturnType = viem_GetProofReturnType;
export type GetProofErrorType = viem_GetProofErrorType;
/** https://wagmi.sh/core/api/actions/getProof */
export declare function getProof<config extends Config>(config: config, parameters: GetProofParameters<config>): Promise<GetProofReturnType>;
//# sourceMappingURL=getProof.d.ts.map