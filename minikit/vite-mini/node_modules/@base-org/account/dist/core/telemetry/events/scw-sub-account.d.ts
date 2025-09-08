export declare const logSubAccountRequestStarted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logSubAccountRequestCompleted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logSubAccountRequestError: ({ method, correlationId, errorMessage, }: {
    method: string;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
export declare const logAddOwnerStarted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logAddOwnerCompleted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logAddOwnerError: ({ method, correlationId, errorMessage, }: {
    method: string;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
export declare const logInsufficientBalanceErrorHandlingStarted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logInsufficientBalanceErrorHandlingCompleted: ({ method, correlationId, }: {
    method: string;
    correlationId: string | undefined;
}) => void;
export declare const logInsufficientBalanceErrorHandlingError: ({ method, correlationId, errorMessage, }: {
    method: string;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
//# sourceMappingURL=scw-sub-account.d.ts.map