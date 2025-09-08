import { type EIP6963ProviderDetail, type Store as MipdStore } from 'mipd';
import { type Address, type Chain, type Client, type EIP1193RequestFn, type ClientConfig as viem_ClientConfig, type Transport as viem_Transport } from 'viem';
import { type Mutate, type StoreApi } from 'zustand/vanilla';
import type { ConnectorEventMap, CreateConnectorFn } from './connectors/createConnector.js';
import { type Emitter, type EventData } from './createEmitter.js';
import { type Storage } from './createStorage.js';
import type { Compute, ExactPartial, LooseOmit, OneOf } from './types/utils.js';
export declare function createConfig<const chains extends readonly [Chain, ...Chain[]], transports extends Record<chains[number]['id'], Transport>, const connectorFns extends readonly CreateConnectorFn[]>(parameters: CreateConfigParameters<chains, transports, connectorFns>): Config<chains, transports, connectorFns>;
export type CreateConfigParameters<chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]], transports extends Record<chains[number]['id'], Transport> = Record<chains[number]['id'], Transport>, connectorFns extends readonly CreateConnectorFn[] = readonly CreateConnectorFn[]> = Compute<{
    chains: chains;
    connectors?: connectorFns | undefined;
    multiInjectedProviderDiscovery?: boolean | undefined;
    storage?: Storage | null | undefined;
    ssr?: boolean | undefined;
    syncConnectedChain?: boolean | undefined;
} & OneOf<({
    transports: transports;
} & {
    [key in keyof ClientConfig]?: ClientConfig[key] | {
        [_ in chains[number]['id']]?: ClientConfig[key] | undefined;
    } | undefined;
}) | {
    client(parameters: {
        chain: chains[number];
    }): Client<transports[chains[number]['id']], chains[number]>;
}>>;
export type Config<chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]], transports extends Record<chains[number]['id'], Transport> = Record<chains[number]['id'], Transport>, connectorFns extends readonly CreateConnectorFn[] = readonly CreateConnectorFn[]> = {
    readonly chains: chains;
    readonly connectors: readonly Connector<connectorFns[number]>[];
    readonly storage: Storage | null;
    readonly state: State<chains>;
    setState<tchains extends readonly [Chain, ...Chain[]] = chains>(value: State<tchains> | ((state: State<tchains>) => State<tchains>)): void;
    subscribe<state>(selector: (state: State<chains>) => state, listener: (state: state, previousState: state) => void, options?: {
        emitImmediately?: boolean | undefined;
        equalityFn?: ((a: state, b: state) => boolean) | undefined;
    } | undefined): () => void;
    getClient<chainId extends chains[number]['id']>(parameters?: {
        chainId?: chainId | chains[number]['id'] | undefined;
    }): Client<transports[chainId], Extract<chains[number], {
        id: chainId;
    }>>;
    /**
     * Not part of versioned API, proceed with caution.
     * @internal
     */
    _internal: Internal<chains, transports>;
};
type Internal<chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]], transports extends Record<chains[number]['id'], Transport> = Record<chains[number]['id'], Transport>> = {
    readonly mipd: MipdStore | undefined;
    revalidate: () => Promise<void>;
    readonly store: Mutate<StoreApi<any>, [['zustand/persist', any]]>;
    readonly ssr: boolean;
    readonly syncConnectedChain: boolean;
    readonly transports: transports;
    chains: {
        setState(value: readonly [Chain, ...Chain[]] | ((state: readonly [Chain, ...Chain[]]) => readonly [Chain, ...Chain[]])): void;
        subscribe(listener: (state: readonly [Chain, ...Chain[]], prevState: readonly [Chain, ...Chain[]]) => void): () => void;
    };
    connectors: {
        providerDetailToConnector(providerDetail: EIP6963ProviderDetail): CreateConnectorFn;
        setup<connectorFn extends CreateConnectorFn>(connectorFn: connectorFn): Connector<connectorFn>;
        setState(value: Connector[] | ((state: Connector[]) => Connector[])): void;
        subscribe(listener: (state: Connector[], prevState: Connector[]) => void): () => void;
    };
    events: {
        change(data: EventData<ConnectorEventMap, 'change'>): void;
        connect(data: EventData<ConnectorEventMap, 'connect'>): void;
        disconnect(data: EventData<ConnectorEventMap, 'disconnect'>): void;
    };
};
export type State<chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]]> = {
    chainId: chains[number]['id'];
    connections: Map<string, Connection>;
    current: string | null;
    status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting';
};
export type PartializedState = Compute<ExactPartial<Pick<State, 'chainId' | 'connections' | 'current' | 'status'>>>;
export type Connection = {
    accounts: readonly [Address, ...Address[]];
    chainId: number;
    connector: Connector;
};
export type Connector<createConnectorFn extends CreateConnectorFn = CreateConnectorFn> = ReturnType<createConnectorFn> & {
    emitter: Emitter<ConnectorEventMap>;
    uid: string;
};
export type Transport<type extends string = string, rpcAttributes = Record<string, any>, eip1193RequestFn extends EIP1193RequestFn = EIP1193RequestFn> = (params: Parameters<viem_Transport<type, rpcAttributes, eip1193RequestFn>>[0] & {
    connectors?: StoreApi<Connector[]> | undefined;
}) => ReturnType<viem_Transport<type, rpcAttributes, eip1193RequestFn>>;
type ClientConfig = LooseOmit<viem_ClientConfig, 'account' | 'chain' | 'key' | 'name' | 'transport' | 'type'>;
export {};
//# sourceMappingURL=createConfig.d.ts.map