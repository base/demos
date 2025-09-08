import { type Config, type GetClientParameters, type GetClientReturnType, type ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import type { ConfigParameter } from '../types/properties.js';
export type UseClientParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined> = Compute<GetClientParameters<config, chainId> & ConfigParameter<config>>;
export type UseClientReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined> = GetClientReturnType<config, chainId>;
/** https://wagmi.sh/react/api/hooks/useClient */
export declare function useClient<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined>(parameters?: UseClientParameters<config, chainId>): UseClientReturnType<config, chainId>;
//# sourceMappingURL=useClient.d.ts.map