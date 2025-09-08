import { type GetCapabilitiesErrorType as viem_GetCapabilitiesErrorType, type GetCapabilitiesParameters as viem_GetCapabilitiesParameters, type GetCapabilitiesReturnType as viem_GetCapabilitiesReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ConnectorParameter } from '../types/properties.js';
export type GetCapabilitiesParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined> = viem_GetCapabilitiesParameters<chainId> & ConnectorParameter;
export type GetCapabilitiesReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined> = viem_GetCapabilitiesReturnType<chainId>;
export type GetCapabilitiesErrorType = viem_GetCapabilitiesErrorType;
/** https://wagmi.sh/core/api/actions/getCapabilities */
export declare function getCapabilities<config extends Config, chainId extends config['chains'][number]['id'] | undefined = undefined>(config: config, parameters?: GetCapabilitiesParameters<config, chainId>): Promise<GetCapabilitiesReturnType<config, chainId>>;
//# sourceMappingURL=getCapabilities.d.ts.map