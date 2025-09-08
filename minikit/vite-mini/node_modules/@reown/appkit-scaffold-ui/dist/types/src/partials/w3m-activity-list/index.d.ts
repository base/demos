import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-transaction-list-item';
import '@reown/appkit-ui/wui-transaction-list-item-loader';
export declare class W3mActivityList extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private paginationObserver?;
    page: 'account' | 'activity';
    private caipAddress;
    private transactionsByYear;
    private loading;
    private empty;
    private next;
    constructor();
    firstUpdated(): void;
    updated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private updateTransactionView;
    private templateTransactionsByYear;
    private templateRenderTransaction;
    private templateTransactions;
    private emptyStateActivity;
    private emptyStateAccount;
    private templateEmpty;
    private templateLoading;
    private onReceiveClick;
    private createPaginationObserver;
    private setPaginationObserver;
    private getTransactionListItemProps;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-activity-list': W3mActivityList;
    }
}
