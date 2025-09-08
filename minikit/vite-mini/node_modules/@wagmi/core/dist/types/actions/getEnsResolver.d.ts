import { type GetEnsResolverErrorType as viem_GetEnsResolverErrorType, type GetEnsResolverParameters as viem_GetEnsResolverParameters, type GetEnsResolverReturnType as viem_GetEnsResolverReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetEnsResolverParameters<config extends Config = Config> = Compute<viem_GetEnsResolverParameters & ChainIdParameter<config>>;
export type GetEnsResolverReturnType = viem_GetEnsResolverReturnType;
export type GetEnsResolverErrorType = viem_GetEnsResolverErrorType;
/** https://wagmi.sh/core/api/actions/getEnsResolver */
export declare function getEnsResolver<config extends Config>(config: config, parameters: GetEnsResolverParameters<config>): Promise<GetEnsResolverReturnType>;
//# sourceMappingURL=getEnsResolver.d.ts.map