import { type Config, type GetPublicClientParameters, type GetPublicClientReturnType, type ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import type { ConfigParameter } from '../types/properties.js';
export type UsePublicClientParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined> = Compute<GetPublicClientParameters<config, chainId> & ConfigParameter<config>>;
export type UsePublicClientReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined> = GetPublicClientReturnType<config, chainId>;
/** https://wagmi.sh/react/api/hooks/usePublicClient */
export declare function usePublicClient<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined>(parameters?: UsePublicClientParameters<config, chainId>): UsePublicClientReturnType<config, chainId>;
//# sourceMappingURL=usePublicClient.d.ts.map