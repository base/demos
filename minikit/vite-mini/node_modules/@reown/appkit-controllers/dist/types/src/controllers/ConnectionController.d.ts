import { type CaipNetwork, type ChainNamespace } from '@reown/appkit-common';
import type { W3mFrameTypes } from '@reown/appkit-wallet';
import type { Connector, EstimateGasTransactionArgs, SendTransactionArgs, WalletGetAssetsParams, WalletGetAssetsResponse, WcWallet, WriteContractArgs } from '../utils/TypeUtil.js';
export type Connection = {
    accounts: {
        address: string;
    }[];
    connectorId: string;
};
interface SwitchAccountParams {
    connection: Connection;
    address: string;
    namespace: ChainNamespace;
}
export interface ConnectExternalOptions {
    id: Connector['id'];
    type: Connector['type'];
    provider?: Connector['provider'];
    info?: Connector['info'];
    chain?: ChainNamespace;
    chainId?: number | string;
    caipNetwork?: CaipNetwork;
    socialUri?: string;
}
export interface ConnectionControllerClient {
    connectWalletConnect?: () => Promise<void>;
    disconnect: (chainNamespace?: ChainNamespace) => Promise<void>;
    signMessage: (message: string) => Promise<string>;
    sendTransaction: (args: SendTransactionArgs) => Promise<string | null>;
    estimateGas: (args: EstimateGasTransactionArgs) => Promise<bigint>;
    parseUnits: (value: string, decimals: number) => bigint;
    formatUnits: (value: bigint, decimals: number) => string;
    connectExternal?: (options: ConnectExternalOptions) => Promise<void>;
    reconnectExternal?: (options: ConnectExternalOptions) => Promise<void>;
    checkInstalled?: (ids?: string[]) => boolean;
    writeContract: (args: WriteContractArgs) => Promise<`0x${string}` | null>;
    getEnsAddress: (value: string) => Promise<false | string>;
    getEnsAvatar: (value: string) => Promise<false | string>;
    grantPermissions: (params: readonly unknown[] | object) => Promise<unknown>;
    revokePermissions: (params: {
        pci: string;
        permissions: unknown[];
        expiry: number;
        address: `0x${string}`;
    }) => Promise<`0x${string}`>;
    getCapabilities: (params: string) => Promise<unknown>;
    walletGetAssets: (params: WalletGetAssetsParams) => Promise<WalletGetAssetsResponse>;
    updateBalance: (chainNamespace: ChainNamespace) => void;
}
export interface ConnectionControllerState {
    connections: Map<ChainNamespace, Connection[]>;
    _client?: ConnectionControllerClient;
    wcUri?: string;
    wcPairingExpiry?: number;
    wcLinking?: {
        href: string;
        name: string;
    };
    wcBasic?: boolean;
    wcError?: boolean;
    recentWallet?: WcWallet;
    buffering: boolean;
    status?: 'connecting' | 'connected' | 'disconnected';
    connectionControllerClient?: ConnectionControllerClient;
}
type StateKey = keyof ConnectionControllerState;
export declare const ConnectionController: {
    state: ConnectionControllerState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: ConnectionControllerState[K]) => void): () => void;
    _getClient(): ConnectionControllerClient | undefined;
    setClient(client: ConnectionControllerClient): void;
    connectWalletConnect(): Promise<void>;
    connectExternal(options: ConnectExternalOptions, chain: ChainNamespace, setChain?: boolean): Promise<void>;
    reconnectExternal(options: ConnectExternalOptions): Promise<void>;
    setPreferredAccountType(accountType: W3mFrameTypes.AccountType, namespace: ChainNamespace): Promise<void>;
    signMessage(message: string): Promise<string | undefined>;
    parseUnits(value: string, decimals: number): bigint | undefined;
    formatUnits(value: bigint, decimals: number): string | undefined;
    sendTransaction(args: SendTransactionArgs): Promise<string | null | undefined>;
    getCapabilities(params: string): Promise<unknown>;
    grantPermissions(params: object | readonly unknown[]): Promise<unknown>;
    walletGetAssets(params: WalletGetAssetsParams): Promise<WalletGetAssetsResponse>;
    estimateGas(args: EstimateGasTransactionArgs): Promise<bigint | undefined>;
    writeContract(args: WriteContractArgs): Promise<`0x${string}` | null | undefined>;
    getEnsAddress(value: string): Promise<string | false | undefined>;
    getEnsAvatar(value: string): Promise<string | false | undefined>;
    checkInstalled(ids?: string[]): boolean;
    resetWcConnection(): void;
    resetUri(): void;
    finalizeWcConnection(): void;
    setWcBasic(wcBasic: ConnectionControllerState["wcBasic"]): void;
    setUri(uri: string): void;
    setWcLinking(wcLinking: ConnectionControllerState["wcLinking"]): void;
    setWcError(wcError: ConnectionControllerState["wcError"]): void;
    setRecentWallet(wallet: ConnectionControllerState["recentWallet"]): void;
    setBuffering(buffering: ConnectionControllerState["buffering"]): void;
    setStatus(status: ConnectionControllerState["status"]): void;
    disconnect(namespace?: ChainNamespace): Promise<void>;
    setConnections(connections: Connection[], chainNamespace: ChainNamespace): void;
    switchAccount({ connection, address, namespace }: SwitchAccountParams): void;
};
export {};
