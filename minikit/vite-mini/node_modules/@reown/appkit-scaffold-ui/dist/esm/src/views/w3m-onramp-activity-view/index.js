var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DateUtil } from '@reown/appkit-common';
import { AccountController, AssetController, OnRampController, OptionsController, TransactionsController } from '@reown/appkit-controllers';
import { TransactionUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-transaction-list-item-loader';
import '../../partials/w3m-onramp-activity-item/index.js';
import styles from './styles.js';
const LOADING_ITEM_COUNT = 7;
let W3mOnRampActivityView = class W3mOnRampActivityView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.selectedOnRampProvider = OnRampController.state.selectedProvider;
        this.loading = false;
        this.coinbaseTransactions = TransactionsController.state.coinbaseTransactions;
        this.tokenImages = AssetController.state.tokenImages;
        this.unsubscribe.push(...[
            OnRampController.subscribeKey('selectedProvider', val => {
                this.selectedOnRampProvider = val;
            }),
            AssetController.subscribeKey('tokenImages', val => (this.tokenImages = val)),
            () => {
                clearTimeout(this.refetchTimeout);
            },
            TransactionsController.subscribe(val => {
                this.coinbaseTransactions = { ...val.coinbaseTransactions };
            })
        ]);
        TransactionsController.clearCursor();
        this.fetchTransactions();
    }
    render() {
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 's', 's', 's']} gap="xs">
        ${this.loading ? this.templateLoading() : this.templateTransactionsByYear()}
      </wui-flex>
    `;
    }
    templateTransactions(transactions) {
        return transactions?.map(transaction => {
            const date = DateUtil.formatDate(transaction?.metadata?.minedAt);
            const transfer = transaction.transfers[0];
            const fungibleInfo = transfer?.fungible_info;
            if (!fungibleInfo) {
                return null;
            }
            const icon = fungibleInfo?.icon?.url || this.tokenImages?.[fungibleInfo.symbol || ''];
            return html `
        <w3m-onramp-activity-item
          label="Bought"
          .completed=${transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_SUCCESS'}
          .inProgress=${transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_IN_PROGRESS'}
          .failed=${transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_FAILED'}
          purchaseCurrency=${ifDefined(fungibleInfo.symbol)}
          purchaseValue=${transfer.quantity.numeric}
          date=${date}
          icon=${ifDefined(icon)}
          symbol=${ifDefined(fungibleInfo.symbol)}
        ></w3m-onramp-activity-item>
      `;
        });
    }
    templateTransactionsByYear() {
        const sortedYearKeys = Object.keys(this.coinbaseTransactions).sort().reverse();
        return sortedYearKeys.map(year => {
            const yearInt = parseInt(year, 10);
            const sortedMonthIndexes = new Array(12)
                .fill(null)
                .map((_, idx) => idx)
                .reverse();
            return sortedMonthIndexes.map(month => {
                const groupTitle = TransactionUtil.getTransactionGroupTitle(yearInt, month);
                const transactions = this.coinbaseTransactions[yearInt]?.[month];
                if (!transactions) {
                    return null;
                }
                return html `
          <wui-flex flexDirection="column">
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${['xs', 's', 's', 's']}
            >
              <wui-text variant="paragraph-500" color="fg-200">${groupTitle}</wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(transactions)}
            </wui-flex>
          </wui-flex>
        `;
            });
        });
    }
    async fetchTransactions() {
        const provider = 'coinbase';
        if (provider === 'coinbase') {
            await this.fetchCoinbaseTransactions();
        }
    }
    async fetchCoinbaseTransactions() {
        const address = AccountController.state.address;
        const projectId = OptionsController.state.projectId;
        if (!address) {
            throw new Error('No address found');
        }
        if (!projectId) {
            throw new Error('No projectId found');
        }
        this.loading = true;
        await TransactionsController.fetchTransactions(address, 'coinbase');
        this.loading = false;
        this.refetchLoadingTransactions();
    }
    refetchLoadingTransactions() {
        const today = new Date();
        const currentMonthTxs = this.coinbaseTransactions[today.getFullYear()]?.[today.getMonth()] || [];
        const loadingTransactions = currentMonthTxs.filter(transaction => transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_IN_PROGRESS');
        if (loadingTransactions.length === 0) {
            clearTimeout(this.refetchTimeout);
            return;
        }
        this.refetchTimeout = setTimeout(async () => {
            const address = AccountController.state.address;
            await TransactionsController.fetchTransactions(address, 'coinbase');
            this.refetchLoadingTransactions();
        }, 3000);
    }
    templateLoading() {
        return Array(LOADING_ITEM_COUNT)
            .fill(html ` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `)
            .map(item => item);
    }
};
W3mOnRampActivityView.styles = styles;
__decorate([
    state()
], W3mOnRampActivityView.prototype, "selectedOnRampProvider", void 0);
__decorate([
    state()
], W3mOnRampActivityView.prototype, "loading", void 0);
__decorate([
    state()
], W3mOnRampActivityView.prototype, "coinbaseTransactions", void 0);
__decorate([
    state()
], W3mOnRampActivityView.prototype, "tokenImages", void 0);
W3mOnRampActivityView = __decorate([
    customElement('w3m-onramp-activity-view')
], W3mOnRampActivityView);
export { W3mOnRampActivityView };
//# sourceMappingURL=index.js.map