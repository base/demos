import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
export declare class W3mConnectingWcBrowser extends W3mConnectingWidget {
    constructor();
    private onConnectProxy;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-browser': W3mConnectingWcBrowser;
    }
}
