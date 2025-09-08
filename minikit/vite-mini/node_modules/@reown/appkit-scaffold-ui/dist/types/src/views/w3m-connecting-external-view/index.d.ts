import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
export declare class W3mConnectingExternalView extends W3mConnectingWidget {
    private externalViewUnsubscribe;
    constructor();
    disconnectedCallback(): void;
    private onConnectProxy;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-external-view': W3mConnectingExternalView;
    }
}
