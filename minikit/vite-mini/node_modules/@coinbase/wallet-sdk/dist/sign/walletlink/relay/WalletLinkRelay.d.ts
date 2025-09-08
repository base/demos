import { AppMetadata } from '../../../core/provider/interface.js';
import { ScopedLocalStorage } from '../../../core/storage/ScopedLocalStorage.js';
import { WalletLinkConnectionUpdateListener } from './connection/WalletLinkConnection.js';
import { EthereumTransactionParams } from './type/EthereumTransactionParams.js';
import { WalletLinkSession } from './type/WalletLinkSession.js';
import { Web3Method, Web3Request } from './type/Web3Request.js';
import { Web3Response } from './type/Web3Response.js';
export interface WalletLinkRelayOptions {
    linkAPIUrl: string;
    storage: ScopedLocalStorage;
    metadata: AppMetadata;
    accountsCallback: (account: string[]) => void;
    chainCallback: (jsonRpcUrl: string, chainId: number) => void;
}
export declare class WalletLinkRelay implements WalletLinkConnectionUpdateListener {
    private static accountRequestCallbackIds;
    private readonly linkAPIUrl;
    private readonly storage;
    private _session;
    private readonly relayEventManager;
    private connection;
    private accountsCallback;
    private chainCallbackParams;
    private chainCallback;
    private ui;
    private isMobileWeb;
    private metadata;
    isLinked: boolean | undefined;
    isUnlinkedErrorState: boolean | undefined;
    constructor(options: Readonly<WalletLinkRelayOptions>);
    private subscribe;
    linkedUpdated: (linked: boolean) => void;
    metadataUpdated: (key: string, value: string) => void;
    chainUpdated: (chainId: string, jsonRpcUrl: string) => void;
    accountUpdated: (selectedAddress: string) => void;
    resetAndReload(): void;
    signEthereumTransaction(params: EthereumTransactionParams): Promise<Web3Response<"signEthereumTransaction">>;
    signAndSubmitEthereumTransaction(params: EthereumTransactionParams): Promise<Web3Response<"submitEthereumTransaction">>;
    submitEthereumTransaction(signedTransaction: Buffer, chainId: number): Promise<Web3Response<"submitEthereumTransaction">>;
    getWalletLinkSession(): WalletLinkSession;
    sendRequest<RequestMethod extends Web3Method, ResponseMethod extends Web3Method = RequestMethod, Response = Web3Response<ResponseMethod>>(request: Web3Request<RequestMethod>): Promise<Response>;
    private publishWeb3RequestEvent;
    private openCoinbaseWalletDeeplink;
    private publishWeb3RequestCanceledEvent;
    private publishEvent;
    handleWeb3ResponseMessage(id: string, response: Web3Response): void;
    private handleErrorResponse;
    private invokeCallback;
    requestEthereumAccounts(): Promise<Web3Response<"requestEthereumAccounts">>;
    watchAsset(type: string, address: string, symbol?: string, decimals?: number, image?: string, chainId?: string): Promise<Web3Response<'watchAsset'>>;
    addEthereumChain(chainId: string, rpcUrls: string[], iconUrls: string[], blockExplorerUrls: string[], chainName?: string, nativeCurrency?: {
        name: string;
        symbol: string;
        decimals: number;
    }): Promise<Web3Response<"addEthereumChain">>;
    switchEthereumChain(chainId: string, address?: string): Promise<Web3Response<'switchEthereumChain'>>;
}
//# sourceMappingURL=WalletLinkRelay.d.ts.map