import { type Config, type ResolvedRegister, type WatchBlocksParameters } from '@wagmi/core';
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal';
import type { BlockTag } from 'viem';
import type { ConfigParameter, EnabledParameter } from '../types/properties.js';
export type UseWatchBlocksParameters<includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest', config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = UnionCompute<UnionExactPartial<WatchBlocksParameters<includeTransactions, blockTag, config, chainId>> & ConfigParameter<config> & EnabledParameter>;
export type UseWatchBlocksReturnType = void;
/** https://wagmi.sh/react/hooks/useWatchBlocks */
export declare function useWatchBlocks<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'>(parameters?: UseWatchBlocksParameters<includeTransactions, blockTag, config, chainId>): UseWatchBlocksReturnType;
//# sourceMappingURL=useWatchBlocks.d.ts.map