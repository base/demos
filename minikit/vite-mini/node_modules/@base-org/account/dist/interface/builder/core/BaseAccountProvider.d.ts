import { ConstructorOptions, ProviderEventEmitter, ProviderInterface, RequestArguments } from '../../../core/provider/interface.js';
export declare class BaseAccountProvider extends ProviderEventEmitter implements ProviderInterface {
    private readonly communicator;
    private readonly signer;
    constructor({ metadata, preference: { walletUrl, ...preference }, }: Readonly<ConstructorOptions>);
    request<T>(args: RequestArguments): Promise<T>;
    private _request;
    disconnect(): Promise<void>;
    readonly isBaseAccount = true;
}
//# sourceMappingURL=BaseAccountProvider.d.ts.map