import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-certified-switch';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-search-bar';
import '../../partials/w3m-all-wallets-list/index.js';
import '../../partials/w3m-all-wallets-search/index.js';
export declare class W3mAllWalletsView extends LitElement {
    private search;
    private badge?;
    render(): import("lit").TemplateResult<1>;
    private onInputChange;
    private onClick;
    private onDebouncedSearch;
    private qrButtonTemplate;
    private onWalletConnectQr;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-view': W3mAllWalletsView;
    }
}
