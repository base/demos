import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
import '../w3m-mobile-download-links/index.js';
export declare class W3mConnectingWcUnsupported extends LitElement {
    private readonly wallet;
    constructor();
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-unsupported': W3mConnectingWcUnsupported;
    }
}
