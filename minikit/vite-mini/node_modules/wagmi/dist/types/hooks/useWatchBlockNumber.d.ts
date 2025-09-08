import { type Config, type ResolvedRegister, type WatchBlockNumberParameters } from '@wagmi/core';
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal';
import type { ConfigParameter, EnabledParameter } from '../types/properties.js';
export type UseWatchBlockNumberParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = UnionCompute<UnionExactPartial<WatchBlockNumberParameters<config, chainId>> & ConfigParameter<config> & EnabledParameter>;
export type UseWatchBlockNumberReturnType = void;
/** https://wagmi.sh/react/api/hooks/useWatchBlockNumber */
export declare function useWatchBlockNumber<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id']>(parameters?: UseWatchBlockNumberParameters<config, chainId>): UseWatchBlockNumberReturnType;
//# sourceMappingURL=useWatchBlockNumber.d.ts.map