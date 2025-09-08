import { Communicator } from '../../core/communicator/Communicator.js';
import { AppMetadata, ProviderEventCallback, RequestArguments } from '../../core/provider/interface.js';
import { Signer } from '../interface.js';
type ConstructorOptions = {
    metadata: AppMetadata;
    communicator: Communicator;
    callback: ProviderEventCallback | null;
};
export declare class SCWSigner implements Signer {
    private readonly communicator;
    private readonly keyManager;
    private callback;
    private accounts;
    private chain;
    constructor(params: ConstructorOptions);
    handshake(args: RequestArguments): Promise<void>;
    request(request: RequestArguments): Promise<any>;
    _request(request: RequestArguments): Promise<any>;
    private sendRequestToPopup;
    private handleResponse;
    cleanup(): Promise<void>;
    /**
     * @returns `null` if the request was successful.
     * https://eips.ethereum.org/EIPS/eip-3326#wallet_switchethereumchain
     */
    private handleSwitchChainRequest;
    private handleGetCapabilitiesRequest;
    private sendEncryptedRequest;
    private createRequestMessage;
    private decryptResponseMessage;
    private updateChain;
    private addSubAccount;
    private shouldRequestUseSubAccountSigner;
    private sendRequestToSubAccountSigner;
}
export {};
//# sourceMappingURL=SCWSigner.d.ts.map