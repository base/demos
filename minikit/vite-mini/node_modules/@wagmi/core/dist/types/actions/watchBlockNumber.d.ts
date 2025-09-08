import type { Chain, Transport, WebSocketTransport } from 'viem';
import { type WatchBlockNumberParameters as viem_WatchBlockNumberParameters, type WatchBlockNumberReturnType as viem_WatchBlockNumberReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, SyncConnectedChainParameter } from '../types/properties.js';
import type { UnionCompute } from '../types/utils.js';
export type WatchBlockNumberParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: UnionCompute<viem_WatchBlockNumberParameters<config['_internal']['transports'][chains[key]['id']] extends infer transport extends Transport ? Transport extends transport ? WebSocketTransport : transport : WebSocketTransport> & ChainIdParameter<config, chainId> & SyncConnectedChainParameter>;
}[number];
export type WatchBlockNumberReturnType = viem_WatchBlockNumberReturnType;
/** https://wagmi.sh/core/api/actions/watchBlockNumber */
export declare function watchBlockNumber<config extends Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']>(config: config, parameters: WatchBlockNumberParameters<config, chainId>): WatchBlockNumberReturnType;
//# sourceMappingURL=watchBlockNumber.d.ts.map