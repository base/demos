import type { BlockTag, Chain, Transport, WebSocketTransport } from 'viem';
import { type WatchBlocksParameters as viem_WatchBlocksParameters, type WatchBlocksReturnType as viem_WatchBlocksReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, SyncConnectedChainParameter } from '../types/properties.js';
import type { IsNarrowable, UnionCompute } from '../types/utils.js';
export type WatchBlocksParameters<includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest', config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: UnionCompute<viem_WatchBlocksParameters<config['_internal']['transports'][chains[key]['id']] extends infer transport extends Transport ? Transport extends transport ? WebSocketTransport : transport : WebSocketTransport, IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined, includeTransactions, blockTag> & ChainIdParameter<config, chainId> & SyncConnectedChainParameter>;
}[number];
export type WatchBlocksReturnType = viem_WatchBlocksReturnType;
/** https://wagmi.sh/core/actions/watchBlocks */
export declare function watchBlocks<config extends Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'>(config: config, parameters: WatchBlocksParameters<includeTransactions, blockTag, config, chainId>): WatchBlocksReturnType;
//# sourceMappingURL=watchBlocks.d.ts.map