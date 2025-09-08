import type { Exchange, ExchangeBuyStatus } from '../types/exchange.js';
export declare function getApiUrl(): string;
type GetExchangesParams = {
    page: number;
    includeOnly?: string[];
    exclude?: string[];
    asset?: string;
    amount?: string;
};
export type GetExchangesResult = {
    exchanges: Exchange[];
    total: number;
};
type GetPayUrlParams = {
    exchangeId: string;
    asset: string;
    amount: string;
    recipient: string;
};
type GetPayUrlResult = {
    url: string;
    sessionId: string;
};
type GetBuyStatusParams = {
    sessionId: string;
    exchangeId: string;
};
type GetBuyStatusResult = {
    status: ExchangeBuyStatus;
    txHash?: string;
};
export declare function getExchanges(params: GetExchangesParams): Promise<GetExchangesResult>;
export declare function getPayUrl(params: GetPayUrlParams): Promise<GetPayUrlResult>;
export declare function getBuyStatus(params: GetBuyStatusParams): Promise<GetBuyStatusResult>;
export {};
