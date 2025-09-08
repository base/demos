import { proxy, subscribe as sub } from 'valtio/vanilla';
import { W3mFrameRpcConstants } from '@reown/appkit-wallet/utils';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
import { AccountController } from './AccountController.js';
import { BlockchainApiController } from './BlockchainApiController.js';
import { ChainController } from './ChainController.js';
import { EventsController } from './EventsController.js';
import { OptionsController } from './OptionsController.js';
import { SnackController } from './SnackController.js';
// -- State --------------------------------------------- //
const state = proxy({
    transactions: [],
    coinbaseTransactions: {},
    transactionsByYear: {},
    lastNetworkInView: undefined,
    loading: false,
    empty: false,
    next: undefined
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    setLastNetworkInView(lastNetworkInView) {
        state.lastNetworkInView = lastNetworkInView;
    },
    async fetchTransactions(accountAddress, onramp) {
        if (!accountAddress) {
            throw new Error("Transactions can't be fetched without an accountAddress");
        }
        state.loading = true;
        try {
            const response = await BlockchainApiController.fetchTransactions({
                account: accountAddress,
                cursor: state.next,
                onramp,
                // Coinbase transaction history state updates require the latest data
                cache: onramp === 'coinbase' ? 'no-cache' : undefined,
                chainId: ChainController.state.activeCaipNetwork?.caipNetworkId
            });
            const nonSpamTransactions = TransactionsController.filterSpamTransactions(response.data);
            const sameChainTransactions = TransactionsController.filterByConnectedChain(nonSpamTransactions);
            const filteredTransactions = [...state.transactions, ...sameChainTransactions];
            state.loading = false;
            if (onramp === 'coinbase') {
                state.coinbaseTransactions = TransactionsController.groupTransactionsByYearAndMonth(state.coinbaseTransactions, response.data);
            }
            else {
                state.transactions = filteredTransactions;
                state.transactionsByYear = TransactionsController.groupTransactionsByYearAndMonth(state.transactionsByYear, sameChainTransactions);
            }
            state.empty = filteredTransactions.length === 0;
            state.next = response.next ? response.next : undefined;
        }
        catch (error) {
            const activeChainNamespace = ChainController.state.activeChain;
            EventsController.sendEvent({
                type: 'track',
                event: 'ERROR_FETCH_TRANSACTIONS',
                properties: {
                    address: accountAddress,
                    projectId: OptionsController.state.projectId,
                    cursor: state.next,
                    isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                        W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            SnackController.showError('Failed to fetch transactions');
            state.loading = false;
            state.empty = true;
            state.next = undefined;
        }
    },
    groupTransactionsByYearAndMonth(transactionsMap = {}, transactions = []) {
        const grouped = transactionsMap;
        transactions.forEach(transaction => {
            const year = new Date(transaction.metadata.minedAt).getFullYear();
            const month = new Date(transaction.metadata.minedAt).getMonth();
            const yearTransactions = grouped[year] ?? {};
            const monthTransactions = yearTransactions[month] ?? [];
            // If there's a transaction with the same id, remove the old one
            const newMonthTransactions = monthTransactions.filter(tx => tx.id !== transaction.id);
            grouped[year] = {
                ...yearTransactions,
                [month]: [...newMonthTransactions, transaction].sort((a, b) => new Date(b.metadata.minedAt).getTime() - new Date(a.metadata.minedAt).getTime())
            };
        });
        return grouped;
    },
    filterSpamTransactions(transactions) {
        return transactions.filter(transaction => {
            const isAllSpam = transaction.transfers.every(transfer => transfer.nft_info?.flags.is_spam === true);
            return !isAllSpam;
        });
    },
    filterByConnectedChain(transactions) {
        const chainId = ChainController.state.activeCaipNetwork?.caipNetworkId;
        const filteredTransactions = transactions.filter(transaction => transaction.metadata.chain === chainId);
        return filteredTransactions;
    },
    clearCursor() {
        state.next = undefined;
    },
    resetTransactions() {
        state.transactions = [];
        state.transactionsByYear = {};
        state.lastNetworkInView = undefined;
        state.loading = false;
        state.empty = false;
        state.next = undefined;
    }
};
// Export the controller wrapped with our error boundary
export const TransactionsController = withErrorBoundary(controller, 'API_ERROR');
//# sourceMappingURL=TransactionsController.js.map