import type { Config, GetCapabilitiesErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetCapabilitiesData, type GetCapabilitiesOptions, type GetCapabilitiesQueryFnData, type GetCapabilitiesQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseCapabilitiesParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = GetCapabilitiesData<config, chainId>> = Compute<GetCapabilitiesOptions<config, chainId> & ConfigParameter<config> & QueryParameter<GetCapabilitiesQueryFnData<config, chainId>, GetCapabilitiesErrorType, selectData, GetCapabilitiesQueryKey<config, chainId>>>;
export type UseCapabilitiesReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = GetCapabilitiesData<config, chainId>> = UseQueryReturnType<selectData, GetCapabilitiesErrorType>;
/** https://wagmi.sh/react/api/hooks/useCapabilities */
export declare function useCapabilities<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = GetCapabilitiesData<config, chainId>>(parameters?: UseCapabilitiesParameters<config, chainId, selectData>): UseCapabilitiesReturnType<config, chainId, selectData>;
//# sourceMappingURL=useCapabilities.d.ts.map