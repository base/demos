import type { Chain, Transport, WebSocketTransport } from 'viem';
import { type WatchPendingTransactionsParameters as viem_WatchPendingTransactionsParameters, type WatchPendingTransactionsReturnType as viem_WatchPendingTransactionsReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, SyncConnectedChainParameter } from '../types/properties.js';
import type { UnionCompute } from '../types/utils.js';
export type WatchPendingTransactionsParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: UnionCompute<viem_WatchPendingTransactionsParameters<config['_internal']['transports'][chains[key]['id']] extends infer transport extends Transport ? Transport extends transport ? WebSocketTransport : transport : WebSocketTransport> & ChainIdParameter<config, chainId> & SyncConnectedChainParameter>;
}[number];
export type WatchPendingTransactionsReturnType = viem_WatchPendingTransactionsReturnType;
/** https://wagmi.sh/core/api/actions/watchPendingTransactions */
export declare function watchPendingTransactions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters: WatchPendingTransactionsParameters<config, chainId>): () => void;
//# sourceMappingURL=watchPendingTransactions.d.ts.map