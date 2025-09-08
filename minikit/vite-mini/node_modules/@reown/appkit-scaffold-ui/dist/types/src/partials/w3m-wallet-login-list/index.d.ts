import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '../w3m-all-wallets-widget/index.js';
import '../w3m-connector-list/index.js';
export declare class W3mWalletLoginList extends LitElement {
    tabIdx?: number;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-login-list': W3mWalletLoginList;
    }
}
