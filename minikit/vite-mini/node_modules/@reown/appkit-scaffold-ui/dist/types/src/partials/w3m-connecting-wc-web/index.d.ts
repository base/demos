import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
export declare class W3mConnectingWcWeb extends W3mConnectingWidget {
    protected isLoading: boolean;
    constructor();
    private updateLoadingState;
    private onConnectProxy;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-web': W3mConnectingWcWeb;
    }
}
