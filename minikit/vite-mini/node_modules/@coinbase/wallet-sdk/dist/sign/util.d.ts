import { Communicator } from '../core/communicator/Communicator.js';
import { SignerType } from '../core/message/ConfigMessage.js';
import { AppMetadata, Preference, ProviderEventCallback, RequestArguments } from '../core/provider/interface.js';
import { Signer } from './interface.js';
export declare function loadSignerType(): SignerType | null;
export declare function storeSignerType(signerType: SignerType): void;
export declare function signerToSignerType(signer: Signer | null): SignerType | undefined;
export declare function fetchSignerType(params: {
    communicator: Communicator;
    preference: Preference;
    metadata: AppMetadata;
    handshakeRequest: RequestArguments;
    callback: ProviderEventCallback;
}): Promise<SignerType>;
export declare function createSigner(params: {
    signerType: SignerType;
    metadata: AppMetadata;
    communicator: Communicator;
    callback: ProviderEventCallback;
}): Signer;
//# sourceMappingURL=util.d.ts.map