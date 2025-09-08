import { type PayResult } from '../src/controllers/PayController.js';
import { type AppKitPayErrorMessage } from '../src/types/errors.js';
import type { Exchange } from '../src/types/exchange.js';
import type { GetExchangesParams, PayUrlParams, PayUrlResponse, PaymentOptions } from '../src/types/options.js';
interface UsePayReturn {
    open: (options: PaymentOptions) => Promise<void>;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: AppKitPayErrorMessage | null;
    data: PayResult | null;
}
interface UsePayParameters {
    onSuccess?: (data: PayResult) => void;
    onError?: (error: AppKitPayErrorMessage) => void;
}
export declare function usePay(parameters?: UsePayParameters): UsePayReturn;
interface UseAvailableExchangesReturn {
    data: Exchange[] | null;
    isLoading: boolean;
    error: Error | null;
    fetch: (params?: GetExchangesParams) => Promise<void>;
}
export declare function useAvailableExchanges(options?: {
    shouldFetchOnInit?: boolean;
} & GetExchangesParams): UseAvailableExchangesReturn;
export declare function usePayUrlActions(): {
    getUrl: (exchangeId: string, params: PayUrlParams) => Promise<PayUrlResponse>;
    openUrl: (exchangeId: string, params: PayUrlParams, openInNewTab?: boolean) => Promise<PayUrlResponse>;
};
export interface ExchangeBuyStatus {
    status: 'UNKNOWN' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILED';
    txHash?: string;
}
interface UseExchangeBuyStatusParameters {
    exchangeId: string;
    sessionId: string;
    pollingInterval?: number;
    isEnabled?: boolean;
    onSuccess?: (data: ExchangeBuyStatus) => void;
    onError?: (error: Error) => void;
}
interface UseExchangeBuyStatusReturn {
    data: ExchangeBuyStatus | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}
export declare function useExchangeBuyStatus(params: UseExchangeBuyStatusParameters): UseExchangeBuyStatusReturn;
export {};
