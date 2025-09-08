import type { OnRampProvider as OnRampProviderName } from '@reown/appkit-common';
import type { PaymentCurrency, PurchaseCurrency } from '../utils/TypeUtil.js';
export type OnRampProviderOption = 'coinbase' | 'moonpay' | 'stripe' | 'paypal' | 'meld';
export type OnRampProvider = {
    label: string;
    name: OnRampProviderOption;
    feeRange: string;
    url: string;
    supportedChains: string[];
};
export interface OnRampControllerState {
    selectedProvider: OnRampProvider | null;
    purchaseCurrency: PurchaseCurrency;
    paymentCurrency: PaymentCurrency;
    purchaseCurrencies: PurchaseCurrency[];
    paymentCurrencies: PaymentCurrency[];
    purchaseAmount?: number;
    paymentAmount?: number;
    providers: OnRampProvider[];
    error: string | null;
    quotesLoading: boolean;
}
type StateKey = keyof OnRampControllerState;
export declare const USDC_CURRENCY_DEFAULT: {
    id: string;
    name: string;
    symbol: string;
    networks: {
        name: string;
        display_name: string;
        chain_id: string;
        contract_address: string;
    }[];
};
export declare const USD_CURRENCY_DEFAULT: {
    id: string;
    payment_method_limits: {
        id: string;
        min: string;
        max: string;
    }[];
};
export declare const OnRampController: {
    state: OnRampControllerState;
    subscribe(callback: (newState: OnRampControllerState) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: OnRampControllerState[K]) => void): () => void;
    setSelectedProvider(provider: OnRampProvider | null): void;
    setOnrampProviders(providers: OnRampProviderName[]): void;
    setPurchaseCurrency(currency: PurchaseCurrency): void;
    setPaymentCurrency(currency: PaymentCurrency): void;
    setPurchaseAmount(amount: number): void;
    setPaymentAmount(amount: number): void;
    getAvailableCurrencies(): Promise<void>;
    getQuote(): Promise<import("../utils/TypeUtil.js").OnrampQuote | null>;
    resetState(): void;
};
export {};
