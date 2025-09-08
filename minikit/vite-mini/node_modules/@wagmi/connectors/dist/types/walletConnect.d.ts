import type { Compute, ExactPartial, Omit } from '@wagmi/core/internal';
import type { EthereumProvider } from '@walletconnect/ethereum-provider';
import { type Address, type ProviderConnectInfo } from 'viem';
type EthereumProviderOptions = Parameters<(typeof EthereumProvider)['init']>[0];
export type WalletConnectParameters = Compute<{
    /**
     * If a new chain is added to a previously existing configured connector `chains`, this flag
     * will determine if that chain should be considered as stale. A stale chain is a chain that
     * WalletConnect has yet to establish a relationship with (e.g. the user has not approved or
     * rejected the chain).
     *
     * This flag mainly affects the behavior when a wallet does not support dynamic chain authorization
     * with WalletConnect v2.
     *
     * If `true` (default), the new chain will be treated as a stale chain. If the user
     * has yet to establish a relationship (approved/rejected) with this chain in their WalletConnect
     * session, the connector will disconnect upon the dapp auto-connecting, and the user will have to
     * reconnect to the dapp (revalidate the chain) in order to approve the newly added chain.
     * This is the default behavior to avoid an unexpected error upon switching chains which may
     * be a confusing user experience (e.g. the user will not know they have to reconnect
     * unless the dapp handles these types of errors).
     *
     * If `false`, the new chain will be treated as a potentially valid chain. This means that if the user
     * has yet to establish a relationship with the chain in their WalletConnect session, wagmi will successfully
     * auto-connect the user. This comes with the trade-off that the connector will throw an error
     * when attempting to switch to the unapproved chain if the wallet does not support dynamic session updates.
     * This may be useful in cases where a dapp constantly
     * modifies their configured chains, and they do not want to disconnect the user upon
     * auto-connecting. If the user decides to switch to the unapproved chain, it is important that the
     * dapp handles this error and prompts the user to reconnect to the dapp in order to approve
     * the newly added chain.
     *
     * @default true
     */
    isNewChainsStale?: boolean;
} & Omit<EthereumProviderOptions, 'chains' | 'events' | 'optionalChains' | 'optionalEvents' | 'optionalMethods' | 'methods' | 'rpcMap' | 'showQrModal'> & ExactPartial<Pick<EthereumProviderOptions, 'showQrModal'>>>;
export declare function walletConnect(parameters: WalletConnectParameters): import("@wagmi/core").CreateConnectorFn<import("@walletconnect/ethereum-provider").default, {
    connect(parameters?: {
        chainId?: number | undefined;
        isReconnecting?: boolean | undefined;
        pairingTopic?: string | undefined;
    }): Promise<{
        accounts: readonly Address[];
        chainId: number;
    }>;
    getNamespaceChainsIds(): number[];
    getRequestedChainsIds(): Promise<number[]>;
    isChainsStale(): Promise<boolean>;
    onConnect(connectInfo: ProviderConnectInfo): void;
    onDisplayUri(uri: string): void;
    onSessionDelete(data: {
        topic: string;
    }): void;
    setRequestedChainsIds(chains: number[]): void;
    requestedChainsStorageKey: `${string}.requestedChains`;
}, {
    [x: `${string}.requestedChains`]: number[];
}>;
export declare namespace walletConnect {
    var type: "walletConnect";
}
export {};
//# sourceMappingURL=walletConnect.d.ts.map