import { type AppKitPayErrorMessage } from '../types/errors.js';
import type { Exchange } from '../types/exchange.js';
import type { GetExchangesParams, PayUrlParams, PaymentOptions } from '../types/options.js';
type PayStatus = 'UNKNOWN' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILED';
type OpenPayUrlParams = {
    exchangeId: string;
    openInNewTab?: boolean;
};
export type CurrentPayment = {
    type: PaymentType;
    exchangeId?: string;
    sessionId?: string;
    status?: PayStatus;
    result?: string;
};
export type PayResult = CurrentPayment['result'];
export interface PayControllerState extends PaymentOptions {
    isConfigured: boolean;
    error: AppKitPayErrorMessage | null;
    isPaymentInProgress: boolean;
    isLoading: boolean;
    exchanges: Exchange[];
    currentPayment?: CurrentPayment;
    analyticsSet: boolean;
    paymentId?: string;
}
type StateKey = keyof PayControllerState;
type PaymentType = 'wallet' | 'exchange';
export declare const PayController: {
    state: PayControllerState;
    subscribe(callback: (newState: PayControllerState) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: PayControllerState[K]) => void): () => void;
    handleOpenPay(options: PaymentOptions): Promise<void>;
    resetState(): void;
    setPaymentConfig(config: PaymentOptions): void;
    getPaymentAsset(): import("../types/options.js").PaymentAsset;
    getExchanges(): Exchange[];
    fetchExchanges(): Promise<void>;
    getAvailableExchanges(params?: GetExchangesParams): Promise<import("../utils/ApiUtil.js").GetExchangesResult>;
    getPayUrl(exchangeId: string, params: PayUrlParams, headless?: boolean): Promise<{
        url: string;
        sessionId: string;
    }>;
    openPayUrl(openParams: OpenPayUrlParams, params: PayUrlParams, headless?: boolean): Promise<{
        url: string;
        sessionId: string;
    }>;
    subscribeEvents(): void;
    handlePayment(): Promise<void>;
    getExchangeById(exchangeId: string): Exchange | undefined;
    validatePayConfig(config: PaymentOptions): void;
    handlePayWithWallet(): void;
    handlePayWithExchange(exchangeId: string): Promise<{
        url: string;
        openInNewTab: boolean | undefined;
    } | null>;
    getBuyStatus(exchangeId: string, sessionId: string): Promise<{
        status: import("../types/exchange.js").ExchangeBuyStatus;
        txHash?: string;
    }>;
    updateBuyStatus(exchangeId: string, sessionId: string): Promise<void>;
    initiatePayment(): void;
    initializeAnalytics(): void;
};
export {};
