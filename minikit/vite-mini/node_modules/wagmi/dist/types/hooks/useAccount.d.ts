import { type Config, type GetAccountReturnType, type ResolvedRegister } from '@wagmi/core';
import type { ConfigParameter } from '../types/properties.js';
export type UseAccountParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseAccountReturnType<config extends Config = Config> = GetAccountReturnType<config>;
/** https://wagmi.sh/react/api/hooks/useAccount */
export declare function useAccount<config extends Config = ResolvedRegister['config']>(parameters?: UseAccountParameters<config>): UseAccountReturnType<config>;
//# sourceMappingURL=useAccount.d.ts.map