import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-all-wallets-widget/index.js';
import '../../partials/w3m-connector-list/index.js';
import '../w3m-connecting-wc-view/index.js';
export declare class W3mConnectingWcBasicView extends LitElement {
    private isMobile;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-basic-view': W3mConnectingWcBasicView;
    }
}
