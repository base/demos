import { type Config, type GetConnectorsReturnType, type ResolvedRegister } from '@wagmi/core';
import type { ConfigParameter } from '../types/properties.js';
export type UseConnectorsParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseConnectorsReturnType<config extends Config = Config> = GetConnectorsReturnType<config>;
/** https://wagmi.sh/react/api/hooks/useConnectors */
export declare function useConnectors<config extends Config = ResolvedRegister['config']>(parameters?: UseConnectorsParameters<config>): UseConnectorsReturnType<config>;
//# sourceMappingURL=useConnectors.d.ts.map