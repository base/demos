/// <reference types="node" />
import { ErrorHandler } from '../core/error';
import { AddressString, IntNumber, ProviderType, RegExpString } from '../core/type';
import { JSONRPCRequest, JSONRPCResponse } from '../provider/JSONRPC';
import { Session } from './Session';
import { EthereumTransactionParams } from './walletlink/type/EthereumTransactionParams';
import { SupportedWeb3Method, Web3Request } from './walletlink/type/Web3Request';
import { Web3Response } from './walletlink/type/Web3Response';
export declare const WALLET_USER_NAME_KEY = "walletUsername";
export declare const LOCAL_STORAGE_ADDRESSES_KEY = "Addresses";
export declare const APP_VERSION_KEY = "AppVersion";
export type CancelablePromise<T> = {
    promise: Promise<T>;
    cancel: ErrorHandler;
};
export declare abstract class RelayAbstract {
    abstract resetAndReload(): void;
    abstract requestEthereumAccounts(): CancelablePromise<Web3Response<'requestEthereumAccounts'>>;
    abstract addEthereumChain(chainId: string, rpcUrls: string[], iconUrls: string[], blockExplorerUrls: string[], chainName: string, nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    }): CancelablePromise<Web3Response<'addEthereumChain'>>;
    abstract watchAsset(type: string, address: string, symbol?: string, decimals?: number, image?: string, chainId?: string): CancelablePromise<Web3Response<'watchAsset'>>;
    abstract selectProvider(providerOptions: ProviderType[]): CancelablePromise<Web3Response<'selectProvider'>>;
    abstract switchEthereumChain(chainId: string, address?: string): CancelablePromise<Web3Response<'switchEthereumChain'>>;
    abstract signEthereumMessage(message: Buffer, address: AddressString, addPrefix: boolean, typedDataJson?: string | null): CancelablePromise<Web3Response<'signEthereumMessage'>>;
    abstract ethereumAddressFromSignedMessage(message: Buffer, signature: Buffer, addPrefix: boolean): CancelablePromise<Web3Response<'ethereumAddressFromSignedMessage'>>;
    abstract signEthereumTransaction(params: EthereumTransactionParams): CancelablePromise<Web3Response<'signEthereumTransaction'>>;
    abstract signAndSubmitEthereumTransaction(params: EthereumTransactionParams): CancelablePromise<Web3Response<'submitEthereumTransaction'>>;
    abstract submitEthereumTransaction(signedTransaction: Buffer, chainId: IntNumber): CancelablePromise<Web3Response<'submitEthereumTransaction'>>;
    abstract scanQRCode(regExp: RegExpString): CancelablePromise<Web3Response<'scanQRCode'>>;
    abstract genericRequest(data: object, action: string): CancelablePromise<Web3Response<'generic'>>;
    abstract sendRequest<RequestMethod extends SupportedWeb3Method, ResponseMethod extends SupportedWeb3Method = RequestMethod>(request: Web3Request<RequestMethod>): CancelablePromise<Web3Response<ResponseMethod>>;
    abstract setAppInfo(appName: string, appLogoUrl: string | null): void;
    abstract setAccountsCallback(accountsCallback: (accounts: string[], isDisconnect?: boolean) => void): void;
    abstract setChainCallback(chainIdCallback: (chainId: string, jsonRpcUrl: string) => void): void;
    abstract setDappDefaultChainCallback(chainId: number): void;
    /**
     * Whether the relay supports the add ethereum chain call without
     * needing to be connected to the mobile client.
     */
    abstract inlineAddEthereumChain(chainId: string): boolean;
    makeEthereumJSONRPCRequest(request: JSONRPCRequest, jsonRpcUrl: string): Promise<JSONRPCResponse | void>;
    abstract get session(): Session;
}
