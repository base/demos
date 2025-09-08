import { ConstructorOptions, ProviderEventEmitter, ProviderInterface, RequestArguments } from './core/provider/interface.js';
export declare class CoinbaseWalletProvider extends ProviderEventEmitter implements ProviderInterface {
    private readonly metadata;
    private readonly preference;
    private readonly communicator;
    private signer;
    constructor({ metadata, preference: { keysUrl, ...preference } }: Readonly<ConstructorOptions>);
    request<T>(args: RequestArguments): Promise<T>;
    private _request;
    /** @deprecated Use `.request({ method: 'eth_requestAccounts' })` instead. */
    enable(): Promise<unknown>;
    disconnect(): Promise<void>;
    readonly isCoinbaseWallet = true;
    private requestSignerSelection;
    private initSigner;
}
//# sourceMappingURL=CoinbaseWalletProvider.d.ts.map