import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-grid';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
import '../w3m-all-wallets-list-item/index.js';
export declare class W3mAllWalletsSearch extends LitElement {
    static styles: import("lit").CSSResult;
    private prevQuery;
    private prevBadge?;
    private loading;
    private query;
    private badge?;
    render(): import("lit").TemplateResult<1>;
    private onSearch;
    private walletsTemplate;
    private onConnectWallet;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-search': W3mAllWalletsSearch;
    }
}
