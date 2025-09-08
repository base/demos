import { OnrampTransaction } from '../types';
type OnrampTransactionStatusResponseData = {
    /** List of `OnrampTransactions` in reverse chronological order. */
    transactions: OnrampTransaction[];
    /** A reference to the next page of transactions. */
    nextPageKey: string;
    /** The total number of transactions made by the user. */
    totalCount: string;
};
export declare function fetchOnrampTransactionStatus({ partnerUserId, nextPageKey, pageSize, apiKey, }: {
    partnerUserId: string;
    nextPageKey: string;
    pageSize: string;
    apiKey?: string;
}): Promise<OnrampTransactionStatusResponseData>;
export {};
//# sourceMappingURL=fetchOnrampTransactionStatus.d.ts.map