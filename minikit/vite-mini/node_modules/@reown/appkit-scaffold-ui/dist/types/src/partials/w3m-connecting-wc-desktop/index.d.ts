import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
export declare class W3mConnectingWcDesktop extends W3mConnectingWidget {
    constructor();
    private onRenderProxy;
    private onConnectProxy;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-desktop': W3mConnectingWcDesktop;
    }
}
