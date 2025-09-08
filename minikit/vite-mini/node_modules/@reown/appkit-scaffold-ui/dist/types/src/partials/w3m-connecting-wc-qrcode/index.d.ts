import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-qr-code';
import '@reown/appkit-ui/wui-shimmer';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-ux-by-reown';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
import '../w3m-mobile-download-links/index.js';
export declare class W3mConnectingWcQrcode extends W3mConnectingWidget {
    static styles: import("lit").CSSResult;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private onRenderProxy;
    private qrCodeTemplate;
    private copyTemplate;
    private forceUpdate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-qrcode': W3mConnectingWcQrcode;
    }
}
