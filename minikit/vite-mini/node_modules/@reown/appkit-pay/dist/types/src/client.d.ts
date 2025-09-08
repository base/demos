import { type PayControllerState } from './controllers/PayController.js';
import type { GetExchangesParams, PayUrlParams, PaymentOptions } from './types/options.js';
export declare function openPay(options: PaymentOptions): Promise<void>;
export declare function getAvailableExchanges(params?: GetExchangesParams): Promise<import("./utils/ApiUtil.js").GetExchangesResult>;
export declare function getPayUrl(exchangeId: string, params: PayUrlParams): Promise<{
    url: string;
    sessionId: string;
}>;
export declare function openPayUrl(exchangeId: string, params: PayUrlParams, openInNewTab?: boolean): Promise<{
    url: string;
    sessionId: string;
}>;
export declare function getExchanges(): import("./types/exchange.js").Exchange[];
export declare function getPayResult(): string | undefined;
export declare function getPayError(): import("./types/errors.js").AppKitPayErrorMessage | null;
export declare function getIsPaymentInProgress(): boolean;
export type PayControllerPublicState = Pick<PayControllerState, 'isPaymentInProgress' | 'currentPayment' | 'error'>;
export declare function subscribeStateKey<K extends keyof PayControllerPublicState>(key: K, callback: (value: PayControllerPublicState[K]) => void): () => void;
