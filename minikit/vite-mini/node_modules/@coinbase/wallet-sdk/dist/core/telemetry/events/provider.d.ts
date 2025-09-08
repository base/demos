import { SignerType } from '../../message/ConfigMessage.js';
export declare const logSignerLoadedFromStorage: ({ signerType }: {
    signerType: SignerType;
}) => void;
export declare const logRequestStarted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logRequestError: ({ method, correlationId, signerType, errorMessage, }: {
    method: string;
    correlationId: string | undefined;
    signerType: SignerType | undefined;
    errorMessage: string;
}) => void;
export declare const logRequestResponded: ({ method, signerType, correlationId, }: {
    method: string;
    signerType: SignerType | undefined;
    correlationId: string | undefined;
}) => void;
export declare const logEnableFunctionCalled: () => void;
//# sourceMappingURL=provider.d.ts.map