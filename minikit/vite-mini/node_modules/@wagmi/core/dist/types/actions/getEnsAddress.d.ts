import { type GetEnsAddressErrorType as viem_GetEnsAddressErrorType, type GetEnsAddressParameters as viem_GetEnsAddressParameters, type GetEnsAddressReturnType as viem_GetEnsAddressReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetEnsAddressParameters<config extends Config = Config> = Compute<viem_GetEnsAddressParameters & ChainIdParameter<config>>;
export type GetEnsAddressReturnType = viem_GetEnsAddressReturnType;
export type GetEnsAddressErrorType = viem_GetEnsAddressErrorType;
/** https://wagmi.sh/core/api/actions/getEnsAddress */
export declare function getEnsAddress<config extends Config>(config: config, parameters: GetEnsAddressParameters<config>): Promise<GetEnsAddressReturnType>;
//# sourceMappingURL=getEnsAddress.d.ts.map