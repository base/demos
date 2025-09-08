import type { Config, ResolvedRegister } from '@wagmi/core';
import type { ConfigParameter } from '../types/properties.js';
export type UseConfigParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseConfigReturnType<config extends Config = Config> = config;
/** https://wagmi.sh/react/api/hooks/useConfig */
export declare function useConfig<config extends Config = ResolvedRegister['config']>(parameters?: UseConfigParameters<config>): UseConfigReturnType<config>;
//# sourceMappingURL=useConfig.d.ts.map