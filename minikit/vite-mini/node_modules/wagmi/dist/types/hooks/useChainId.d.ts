import { type Config, type GetChainIdReturnType, type ResolvedRegister } from '@wagmi/core';
import type { ConfigParameter } from '../types/properties.js';
export type UseChainIdParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseChainIdReturnType<config extends Config = Config> = GetChainIdReturnType<config>;
/** https://wagmi.sh/react/api/hooks/useChainId */
export declare function useChainId<config extends Config = ResolvedRegister['config']>(parameters?: UseChainIdParameters<config>): UseChainIdReturnType<config>;
//# sourceMappingURL=useChainId.d.ts.map