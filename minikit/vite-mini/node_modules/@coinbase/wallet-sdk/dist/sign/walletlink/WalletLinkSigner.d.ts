import { AppMetadata, ProviderEventCallback, RequestArguments } from '../../core/provider/interface.js';
import { Signer } from '../interface.js';
export declare class WalletLinkSigner implements Signer {
    private metadata;
    private _relay;
    private readonly _storage;
    private _addresses;
    private callback;
    constructor(options: {
        metadata: AppMetadata;
        callback?: ProviderEventCallback;
    });
    getSession(): {
        id: string;
        secret: string;
    };
    handshake(args: RequestArguments): Promise<void>;
    private get selectedAddress();
    private get jsonRpcUrl();
    private set jsonRpcUrl(value);
    private updateProviderInfo;
    private watchAsset;
    private addEthereumChain;
    private switchEthereumChain;
    cleanup(): Promise<void>;
    private _setAddresses;
    request(request: RequestArguments): Promise<any>;
    private _request;
    private _ensureKnownAddress;
    private _prepareTransactionParams;
    private ecRecover;
    private getChainId;
    private _eth_requestAccounts;
    private personalSign;
    private _eth_signTransaction;
    private _eth_sendRawTransaction;
    private _eth_sendTransaction;
    private signTypedData;
    private initializeRelay;
}
//# sourceMappingURL=WalletLinkSigner.d.ts.map