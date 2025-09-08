import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-card-select-loader';
import '@reown/appkit-ui/wui-grid';
import '../w3m-all-wallets-list-item/index.js';
export declare class W3mAllWalletsList extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private paginationObserver?;
    private loading;
    private wallets;
    private recommended;
    private featured;
    private filteredWallets;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private initialFetch;
    private shimmerTemplate;
    private walletsTemplate;
    private paginationLoaderTemplate;
    private createPaginationObserver;
    private onConnectWallet;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-list': W3mAllWalletsList;
    }
}
