export declare const logHandshakeStarted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logHandshakeError: ({ method, correlationId, errorMessage, }: {
    method: string;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
export declare const logHandshakeCompleted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logRequestStarted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logRequestError: ({ method, correlationId, errorMessage, }: {
    method: string;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
export declare const logRequestCompleted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logWalletLinkConnectionConnectionFailed: () => void;
export declare const logWalletLinkConnectionFetchUnseenEventsFailed: () => void;
//# sourceMappingURL=walletlink-signer.d.ts.map