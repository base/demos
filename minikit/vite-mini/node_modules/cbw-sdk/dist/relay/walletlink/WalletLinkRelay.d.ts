/// <reference types="node" />
import { ErrorType } from '../../core/error';
import { AddressString, IntNumber, ProviderType, RegExpString } from '../../core/type';
import { ScopedLocalStorage } from '../../lib/ScopedLocalStorage';
import { DiagnosticLogger } from '../../provider/DiagnosticLogger';
import { CancelablePromise, RelayAbstract } from '../RelayAbstract';
import { RelayEventManager } from '../RelayEventManager';
import { RelayUI, RelayUIOptions } from '../RelayUI';
import { Session } from '../Session';
import { WalletLinkConnection, WalletLinkConnectionUpdateListener } from './connection/WalletLinkConnection';
import { EthereumTransactionParams } from './type/EthereumTransactionParams';
import { WalletLinkEventData, WalletLinkResponseEventData } from './type/WalletLinkEventData';
import { SupportedWeb3Method, Web3Request } from './type/Web3Request';
import { Web3Response } from './type/Web3Response';
export interface WalletLinkRelayOptions {
    linkAPIUrl: string;
    version: string;
    darkMode: boolean;
    headlessMode: boolean;
    storage: ScopedLocalStorage;
    relayEventManager: RelayEventManager;
    uiConstructor: (options: Readonly<RelayUIOptions>) => RelayUI;
    diagnosticLogger?: DiagnosticLogger;
    reloadOnDisconnect?: boolean;
    enableMobileWalletLink?: boolean;
}
export declare class WalletLinkRelay extends RelayAbstract implements WalletLinkConnectionUpdateListener {
    private static accountRequestCallbackIds;
    private readonly linkAPIUrl;
    protected readonly storage: ScopedLocalStorage;
    private _session;
    private readonly relayEventManager;
    protected readonly diagnostic?: DiagnosticLogger;
    protected connection: WalletLinkConnection;
    private accountsCallback;
    private chainCallbackParams;
    private chainCallback;
    protected dappDefaultChain: number;
    private readonly options;
    protected ui: RelayUI;
    protected appName: string;
    protected appLogoUrl: string | null;
    private _reloadOnDisconnect;
    isLinked: boolean | undefined;
    isUnlinkedErrorState: boolean | undefined;
    constructor(options: Readonly<WalletLinkRelayOptions>);
    subscribe(): {
        session: Session;
        ui: RelayUI;
        connection: WalletLinkConnection;
    };
    linkedUpdated: (linked: boolean) => void;
    metadataUpdated: (key: string, value: string) => void;
    chainUpdated: (chainId: string, jsonRpcUrl: string) => void;
    accountUpdated: (selectedAddress: string) => void;
    connectedUpdated: (connected: boolean) => void;
    attachUI(): void;
    resetAndReload(): void;
    setAppInfo(appName: string, appLogoUrl: string | null): void;
    getStorageItem(key: string): string | null;
    get session(): Session;
    setStorageItem(key: string, value: string): void;
    signEthereumMessage(message: Buffer, address: AddressString, addPrefix: boolean, typedDataJson?: string | null): CancelablePromise<Web3Response<"signEthereumMessage">>;
    ethereumAddressFromSignedMessage(message: Buffer, signature: Buffer, addPrefix: boolean): CancelablePromise<Web3Response<"ethereumAddressFromSignedMessage">>;
    signEthereumTransaction(params: EthereumTransactionParams): CancelablePromise<Web3Response<"signEthereumTransaction">>;
    signAndSubmitEthereumTransaction(params: EthereumTransactionParams): CancelablePromise<Web3Response<"submitEthereumTransaction">>;
    submitEthereumTransaction(signedTransaction: Buffer, chainId: IntNumber): CancelablePromise<Web3Response<"submitEthereumTransaction">>;
    scanQRCode(regExp: RegExpString): CancelablePromise<Web3Response<"scanQRCode">>;
    getQRCodeUrl(): string;
    genericRequest(data: object, action: string): CancelablePromise<Web3Response<"generic">>;
    sendGenericMessage(request: Web3Request<'generic'>): CancelablePromise<Web3Response<'generic'>>;
    sendRequest<RequestMethod extends SupportedWeb3Method, ResponseMethod extends SupportedWeb3Method = RequestMethod, Response = Web3Response<ResponseMethod>>(request: Web3Request<RequestMethod>): CancelablePromise<Response>;
    setConnectDisabled(disabled: boolean): void;
    setAccountsCallback(accountsCallback: (accounts: string[], isDisconnect?: boolean) => void): void;
    setChainCallback(chainCallback: (chainId: string, jsonRpcUrl: string) => void): void;
    setDappDefaultChainCallback(chainId: number): void;
    protected publishWeb3RequestEvent(id: string, request: Web3Request): void;
    private publishWeb3RequestCanceledEvent;
    protected publishEvent(event: string, message: WalletLinkEventData, callWebhook: boolean): Promise<string>;
    handleWeb3ResponseMessage(message: WalletLinkResponseEventData): void;
    private handleErrorResponse;
    private invokeCallback;
    requestEthereumAccounts(): {
        promise: Promise<Web3Response<"requestEthereumAccounts">>;
        cancel: (error?: ErrorType) => void;
    };
    selectProvider(providerOptions: ProviderType[]): {
        cancel: (error?: ErrorType) => void;
        promise: Promise<Web3Response<"selectProvider">>;
    };
    watchAsset(type: string, address: string, symbol?: string, decimals?: number, image?: string, chainId?: string): CancelablePromise<Web3Response<'watchAsset'>>;
    addEthereumChain(chainId: string, rpcUrls: string[], iconUrls: string[], blockExplorerUrls: string[], chainName?: string, nativeCurrency?: {
        name: string;
        symbol: string;
        decimals: number;
    }): {
        promise: Promise<Web3Response<"addEthereumChain">>;
        cancel: (error?: ErrorType) => void;
    };
    switchEthereumChain(chainId: string, address?: string): CancelablePromise<Web3Response<'switchEthereumChain'>>;
    inlineAddEthereumChain(chainId: string): boolean;
    private getSessionIdHash;
    private sendRequestStandalone;
}
