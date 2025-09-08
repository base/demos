import type { Abi, Chain, ContractEventName, Transport, WebSocketTransport } from 'viem';
import { type WatchContractEventParameters as viem_WatchContractEventParameters, type WatchContractEventReturnType as viem_WatchContractEventReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, SyncConnectedChainParameter } from '../types/properties.js';
import type { UnionCompute } from '../types/utils.js';
export type WatchContractEventParameters<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>, strict extends boolean | undefined = undefined, config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: UnionCompute<viem_WatchContractEventParameters<abi, eventName, strict, config['_internal']['transports'][chains[key]['id']] extends infer transport extends Transport ? Transport extends transport ? WebSocketTransport : transport : WebSocketTransport> & ChainIdParameter<config, chainId> & SyncConnectedChainParameter>;
}[number];
export type WatchContractEventReturnType = viem_WatchContractEventReturnType;
/** https://wagmi.sh/core/api/actions/watchContractEvent */
export declare function watchContractEvent<config extends Config, chainId extends config['chains'][number]['id'], const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi> | undefined, strict extends boolean | undefined = undefined>(config: config, parameters: WatchContractEventParameters<abi, eventName, strict, config, chainId>): () => void;
//# sourceMappingURL=watchContractEvent.d.ts.map