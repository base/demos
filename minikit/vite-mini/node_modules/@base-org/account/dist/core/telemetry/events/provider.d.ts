export declare const logRequestStarted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logRequestError: ({ method, correlationId, errorMessage, }: {
    method: string;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
export declare const logRequestResponded: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
//# sourceMappingURL=provider.d.ts.map