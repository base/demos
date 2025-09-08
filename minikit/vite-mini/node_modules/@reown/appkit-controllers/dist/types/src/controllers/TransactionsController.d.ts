import type { Transaction } from '@reown/appkit-common';
import type { CaipNetworkId } from '@reown/appkit-common';
type TransactionByMonthMap = Record<number, Transaction[]>;
type TransactionByYearMap = Record<number, TransactionByMonthMap>;
export interface TransactionsControllerState {
    transactions: Transaction[];
    coinbaseTransactions: TransactionByYearMap;
    transactionsByYear: TransactionByYearMap;
    lastNetworkInView: CaipNetworkId | undefined;
    loading: boolean;
    empty: boolean;
    next: string | undefined;
}
export declare const TransactionsController: {
    state: TransactionsControllerState;
    subscribe(callback: (newState: TransactionsControllerState) => void): () => void;
    setLastNetworkInView(lastNetworkInView: TransactionsControllerState["lastNetworkInView"]): void;
    fetchTransactions(accountAddress?: string, onramp?: "coinbase"): Promise<void>;
    groupTransactionsByYearAndMonth(transactionsMap?: TransactionByYearMap, transactions?: Transaction[]): TransactionByYearMap;
    filterSpamTransactions(transactions: Transaction[]): Transaction[];
    filterByConnectedChain(transactions: Transaction[]): Transaction[];
    clearCursor(): void;
    resetTransactions(): void;
};
export {};
