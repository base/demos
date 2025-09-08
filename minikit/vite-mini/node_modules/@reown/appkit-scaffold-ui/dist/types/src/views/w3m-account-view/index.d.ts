import { LitElement } from 'lit';
import '../../partials/w3m-account-default-widget/index.js';
import '../../partials/w3m-account-wallet-features-widget/index.js';
export declare class W3mAccountView extends LitElement {
    private unsubscribe;
    namespace: import("@reown/appkit-common").ChainNamespace | undefined;
    constructor();
    render(): import("lit").TemplateResult<1> | null;
    private walletFeaturesTemplate;
    private defaultTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-view': W3mAccountView;
    }
}
