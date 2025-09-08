export declare const logPaymentStarted: ({ amount, testnet, correlationId, }: {
    amount: string;
    testnet: boolean;
    correlationId: string | undefined;
}) => void;
export declare const logPaymentError: ({ amount, testnet, correlationId, errorMessage, }: {
    amount: string;
    testnet: boolean;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
export declare const logPaymentCompleted: ({ amount, testnet, correlationId, }: {
    amount: string;
    testnet: boolean;
    correlationId: string | undefined;
}) => void;
export declare const logPaymentStatusCheckStarted: ({ testnet, correlationId, }: {
    testnet: boolean;
    correlationId: string | undefined;
}) => void;
export declare const logPaymentStatusCheckCompleted: ({ testnet, status, correlationId, }: {
    testnet: boolean;
    status: string;
    correlationId: string | undefined;
}) => void;
export declare const logPaymentStatusCheckError: ({ testnet, correlationId, errorMessage, }: {
    testnet: boolean;
    correlationId: string | undefined;
    errorMessage: string;
}) => void;
//# sourceMappingURL=payment.d.ts.map