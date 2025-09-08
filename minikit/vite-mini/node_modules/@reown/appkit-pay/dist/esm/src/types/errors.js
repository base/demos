export const AppKitPayErrorCodes = {
    INVALID_PAYMENT_CONFIG: 'INVALID_PAYMENT_CONFIG',
    INVALID_RECIPIENT: 'INVALID_RECIPIENT',
    INVALID_ASSET: 'INVALID_ASSET',
    INVALID_AMOUNT: 'INVALID_AMOUNT',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    UNABLE_TO_INITIATE_PAYMENT: 'UNABLE_TO_INITIATE_PAYMENT',
    INVALID_CHAIN_NAMESPACE: 'INVALID_CHAIN_NAMESPACE',
    GENERIC_PAYMENT_ERROR: 'GENERIC_PAYMENT_ERROR',
    UNABLE_TO_GET_EXCHANGES: 'UNABLE_TO_GET_EXCHANGES',
    ASSET_NOT_SUPPORTED: 'ASSET_NOT_SUPPORTED',
    UNABLE_TO_GET_PAY_URL: 'UNABLE_TO_GET_PAY_URL',
    UNABLE_TO_GET_BUY_STATUS: 'UNABLE_TO_GET_BUY_STATUS'
};
export const AppKitPayErrorMessages = {
    [AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG]: 'Invalid payment configuration',
    [AppKitPayErrorCodes.INVALID_RECIPIENT]: 'Invalid recipient address',
    [AppKitPayErrorCodes.INVALID_ASSET]: 'Invalid asset specified',
    [AppKitPayErrorCodes.INVALID_AMOUNT]: 'Invalid payment amount',
    [AppKitPayErrorCodes.UNKNOWN_ERROR]: 'Unknown payment error occurred',
    [AppKitPayErrorCodes.UNABLE_TO_INITIATE_PAYMENT]: 'Unable to initiate payment',
    [AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE]: 'Invalid chain namespace',
    [AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR]: 'Unable to process payment',
    [AppKitPayErrorCodes.UNABLE_TO_GET_EXCHANGES]: 'Unable to get exchanges',
    [AppKitPayErrorCodes.ASSET_NOT_SUPPORTED]: 'Asset not supported by the selected exchange',
    [AppKitPayErrorCodes.UNABLE_TO_GET_PAY_URL]: 'Unable to get payment URL',
    [AppKitPayErrorCodes.UNABLE_TO_GET_BUY_STATUS]: 'Unable to get buy status'
};
export class AppKitPayError extends Error {
    get message() {
        return AppKitPayErrorMessages[this.code];
    }
    constructor(code, details) {
        super(AppKitPayErrorMessages[code]);
        this.name = 'AppKitPayError';
        this.code = code;
        this.details = details;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppKitPayError);
        }
    }
}
export function createAppKitPayError(code, details) {
    const errorCode = code || AppKitPayErrorCodes.UNKNOWN_ERROR;
    return new AppKitPayError(errorCode, details);
}
//# sourceMappingURL=errors.js.map