import UniversalProvider from '@walletconnect/universal-provider';
import { type CaipAddress, type CaipNetwork, type ChainNamespace } from '@reown/appkit-common';
import { type AccountControllerState, type AccountType, type Connector as AppKitConnector, type Connection, type Tokens, type WriteContractArgs } from '@reown/appkit-controllers';
import type { W3mFrameProvider } from '@reown/appkit-wallet';
import type { AppKitBaseClient } from '../client/appkit-base-client.js';
import { WalletConnectConnector } from '../connectors/WalletConnectConnector.js';
import type { AppKitOptions } from '../utils/index.js';
import type { ChainAdapterConnector } from './ChainAdapterConnector.js';
type EventName = 'disconnect' | 'accountChanged' | 'connections' | 'switchNetwork' | 'connectors' | 'pendingTransactions';
type EventData = {
    disconnect: () => void;
    accountChanged: {
        address: string;
        chainId?: number | string;
    };
    switchNetwork: {
        address?: string;
        chainId: number | string;
    };
    connections: Connection[];
    connectors: ChainAdapterConnector[];
    pendingTransactions: () => void;
};
type EventCallback<T extends EventName> = (data: EventData[T]) => void;
/**
 * Abstract class representing a chain adapter blueprint.
 * @template Connector - The type of connector extending ChainAdapterConnector
 */
export declare abstract class AdapterBlueprint<Connector extends ChainAdapterConnector = ChainAdapterConnector> {
    namespace: ChainNamespace | undefined;
    projectId?: string;
    adapterType: string | undefined;
    getCaipNetworks: (namespace?: ChainNamespace) => CaipNetwork[];
    protected availableConnectors: Connector[];
    protected connector?: Connector;
    protected provider?: Connector['provider'];
    private eventListeners;
    /**
     * Creates an instance of AdapterBlueprint.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */
    constructor(params?: AdapterBlueprint.Params);
    /**
     * Initializes the adapter with the given parameters.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */
    construct(params: AdapterBlueprint.Params): void;
    /**
     * Gets the available connectors.
     * @returns {Connector[]} An array of available connectors
     */
    get connectors(): Connector[];
    /**
     * Gets the supported networks.
     * @returns {CaipNetwork[]} An array of supported networks
     */
    get networks(): CaipNetwork[];
    /**
     * Sets the universal provider for WalletConnect.
     * @param {UniversalProvider} universalProvider - The universal provider instance
     */
    abstract setUniversalProvider(universalProvider: UniversalProvider): void;
    /**
     * Sets the auth provider.
     * @param {W3mFrameProvider} authProvider - The auth provider instance
     */
    setAuthProvider(authProvider: W3mFrameProvider): void;
    /**
     * Adds one or more connectors to the available connectors list.
     * @param {...Connector} connectors - The connectors to add
     */
    protected addConnector(...connectors: Connector[]): void;
    protected setStatus(status: AccountControllerState['status'], chainNamespace?: ChainNamespace): void;
    /**
     * Adds an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
     */
    on<T extends EventName>(eventName: T, callback: EventCallback<T>): void;
    /**
     * Removes an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be removed
     */
    off<T extends EventName>(eventName: T, callback: EventCallback<T>): void;
    /**
     * Removes all event listeners.
     */
    removeAllEventListeners(): void;
    /**
     * Emits an event with the given name and optional data.
     * @template T
     * @param {T} eventName - The name of the event to emit
     * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
     */
    protected emit<T extends EventName>(eventName: T, data?: EventData[T]): void;
    /**
     * Connects to WalletConnect.
     * @param {number | string} [_chainId] - Optional chain ID to connect to
     */
    connectWalletConnect(_chainId?: number | string): Promise<undefined | {
        clientId: string;
    }>;
    /**
     * Connects to a wallet.
     * @param {AdapterBlueprint.ConnectParams} params - Connection parameters
     * @returns {Promise<AdapterBlueprint.ConnectResult>} Connection result
     */
    abstract connect(params: AdapterBlueprint.ConnectParams): Promise<AdapterBlueprint.ConnectResult>;
    /**
     * Gets the accounts for the connected wallet.
     * @returns {Promise<AccountType[]>} An array of account objects with their associated type and namespace
     */
    abstract getAccounts(params: AdapterBlueprint.GetAccountsParams): Promise<AdapterBlueprint.GetAccountsResult>;
    /**
     * Switches the network.
     * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
     */
    switchNetwork(params: AdapterBlueprint.SwitchNetworkParams): Promise<void>;
    /**
     * Disconnects the current wallet.
     */
    abstract disconnect(params?: AdapterBlueprint.DisconnectParams): Promise<void>;
    /**
     * Gets the balance for a given address and chain ID.
     * @param {AdapterBlueprint.GetBalanceParams} params - Balance retrieval parameters
     * @returns {Promise<AdapterBlueprint.GetBalanceResult>} Balance result
     */
    abstract getBalance(params: AdapterBlueprint.GetBalanceParams): Promise<AdapterBlueprint.GetBalanceResult>;
    /**
     * Synchronizes the connectors with the given options and AppKit instance.
     * @param {AppKitOptions} [options] - Optional AppKit options
     * @param {AppKit} [appKit] - Optional AppKit instance
     */
    abstract syncConnectors(options?: AppKitOptions, appKit?: AppKitBaseClient): void | Promise<void>;
    /**
     * Synchronizes the connection with the given parameters.
     * @param {AdapterBlueprint.SyncConnectionParams} params - Synchronization parameters
     * @returns {Promise<AdapterBlueprint.ConnectResult>} Connection result
     */
    abstract syncConnection(params: AdapterBlueprint.SyncConnectionParams): Promise<AdapterBlueprint.ConnectResult>;
    /**
     * Signs a message with the connected wallet.
     * @param {AdapterBlueprint.SignMessageParams} params - Parameters including message to sign, address, and optional provider
     * @returns {Promise<AdapterBlueprint.SignMessageResult>} Object containing the signature
     */
    abstract signMessage(params: AdapterBlueprint.SignMessageParams): Promise<AdapterBlueprint.SignMessageResult>;
    /**
     * Estimates gas for a transaction.
     * @param {AdapterBlueprint.EstimateGasTransactionArgs} params - Parameters including address, to, data, and optional provider
     * @returns {Promise<AdapterBlueprint.EstimateGasTransactionResult>} Object containing the gas estimate
     */
    abstract estimateGas(params: AdapterBlueprint.EstimateGasTransactionArgs): Promise<AdapterBlueprint.EstimateGasTransactionResult>;
    /**
     * Sends a transaction.
     * @param {AdapterBlueprint.SendTransactionParams} params - Parameters including address, to, data, value, gasPrice, gas, and optional provider
     * @returns {Promise<AdapterBlueprint.SendTransactionResult>} Object containing the transaction hash
     */
    abstract sendTransaction(params: AdapterBlueprint.SendTransactionParams): Promise<AdapterBlueprint.SendTransactionResult>;
    /**
     * Writes a contract transaction.
     * @param {AdapterBlueprint.WriteContractParams} params - Parameters including receiver address, token amount, token address, from address, method, and ABI
     * @returns {Promise<AdapterBlueprint.WriteContractResult>} Object containing the transaction hash
     */
    abstract writeContract(params: AdapterBlueprint.WriteContractParams): Promise<AdapterBlueprint.WriteContractResult>;
    /**
     * Parses a decimal string value into a bigint with the specified number of decimals.
     * @param {AdapterBlueprint.ParseUnitsParams} params - Parameters including value and decimals
     * @returns {AdapterBlueprint.ParseUnitsResult} The parsed bigint value
     */
    abstract parseUnits(params: AdapterBlueprint.ParseUnitsParams): AdapterBlueprint.ParseUnitsResult;
    /**
     * Formats a bigint value into a decimal string with the specified number of decimals.
     * @param {AdapterBlueprint.FormatUnitsParams} params - Parameters including value and decimals
     * @returns {AdapterBlueprint.FormatUnitsResult} The formatted decimal string
     */
    abstract formatUnits(params: AdapterBlueprint.FormatUnitsParams): AdapterBlueprint.FormatUnitsResult;
    /**
     * Gets the WalletConnect provider.
     * @param {AdapterBlueprint.GetWalletConnectProviderParams} params - Parameters including provider, caip networks, and active caip network
     * @returns {AdapterBlueprint.GetWalletConnectProviderResult} The WalletConnect provider
     */
    abstract getWalletConnectProvider(params: AdapterBlueprint.GetWalletConnectProviderParams): AdapterBlueprint.GetWalletConnectProviderResult;
    /**
     * Reconnects to a wallet.
     * @param {AdapterBlueprint.ReconnectParams} params - Reconnection parameters
     */
    reconnect?(params: AdapterBlueprint.ReconnectParams): Promise<void>;
    abstract getCapabilities(params: AdapterBlueprint.GetCapabilitiesParams): Promise<unknown>;
    abstract grantPermissions(params: AdapterBlueprint.GrantPermissionsParams): Promise<unknown>;
    abstract revokePermissions(params: AdapterBlueprint.RevokePermissionsParams): Promise<`0x${string}`>;
    abstract walletGetAssets(params: AdapterBlueprint.WalletGetAssetsParams): Promise<AdapterBlueprint.WalletGetAssetsResponse>;
    protected getWalletConnectConnector(): WalletConnectConnector;
}
export declare namespace AdapterBlueprint {
    type Params = {
        namespace?: ChainNamespace;
        networks?: CaipNetwork[];
        projectId?: string;
        adapterType?: string;
    };
    type SwitchNetworkParams = {
        caipNetwork: CaipNetwork;
        provider?: AppKitConnector['provider'];
        providerType?: AppKitConnector['type'];
    };
    type GetBalanceParams = {
        address: string | undefined;
        chainId: number | string | undefined;
        caipNetwork?: CaipNetwork;
        tokens?: Tokens;
    };
    type DisconnectParams = {
        provider?: AppKitConnector['provider'];
        providerType?: AppKitConnector['type'];
    };
    type ConnectParams = {
        id: string;
        provider?: unknown;
        info?: unknown;
        type: string;
        chain?: ChainNamespace;
        chainId?: number | string;
        rpcUrl?: string;
        socialUri?: string;
    };
    type ReconnectParams = ConnectParams;
    type SyncConnectionParams = {
        id: string;
        namespace: ChainNamespace;
        chainId?: number | string;
        rpcUrl: string;
    };
    type SignMessageParams = {
        message: string;
        address: string;
        provider?: AppKitConnector['provider'];
    };
    type SignMessageResult = {
        signature: string;
    };
    type EstimateGasTransactionArgs = {
        address: string;
        to: string;
        data: string;
        caipNetwork: CaipNetwork;
        provider?: AppKitConnector['provider'];
        value?: bigint | number;
    };
    type EstimateGasTransactionResult = {
        gas: bigint;
    };
    type WriteContractParams = WriteContractArgs & {
        caipNetwork: CaipNetwork;
        provider?: AppKitConnector['provider'];
        caipAddress: CaipAddress;
    };
    type WriteContractResult = {
        hash: string;
    };
    type ParseUnitsParams = {
        value: string;
        decimals: number;
    };
    type ParseUnitsResult = bigint;
    type FormatUnitsParams = {
        value: bigint;
        decimals: number;
    };
    type FormatUnitsResult = string;
    type GetWalletConnectProviderParams = {
        provider: AppKitConnector['provider'];
        caipNetworks: CaipNetwork[];
        activeCaipNetwork: CaipNetwork;
    };
    type GetWalletConnectProviderResult = AppKitConnector['provider'];
    type GetCapabilitiesParams = string;
    type GrantPermissionsParams = object | readonly unknown[];
    type RevokePermissionsParams = {
        pci: string;
        permissions: unknown[];
        expiry: number;
        address: `0x${string}`;
    };
    type WalletGetAssetsParams = {
        account: `0x${string}`;
        assetFilter?: Record<`0x${string}`, (`0x${string}` | 'native')[]>;
        assetTypeFilter?: ('NATIVE' | 'ERC20')[];
        chainFilter?: `0x${string}`[];
    };
    type WalletGetAssetsResponse = Record<`0x${string}`, {
        address: `0x${string}` | 'native';
        balance: `0x${string}`;
        type: 'NATIVE' | 'ERC20';
        metadata: Record<string, unknown>;
    }[]>;
    type SendTransactionParams = {
        to: string;
        value: bigint | number;
        data?: string;
        gasPrice?: bigint | number;
        gas?: bigint | number;
        caipNetwork?: CaipNetwork;
        provider?: AppKitConnector['provider'];
    };
    type SendTransactionResult = {
        hash: string;
    };
    type GetBalanceResult = {
        balance: string;
        symbol: string;
    };
    type ConnectResult = {
        id: AppKitConnector['id'];
        type: AppKitConnector['type'];
        provider: AppKitConnector['provider'];
        chainId: number | string;
        address: string;
    };
    type GetAccountsResult = {
        accounts: AccountType[];
    };
    type GetAccountsParams = {
        id: AppKitConnector['id'];
        namespace?: ChainNamespace;
    };
}
export {};
