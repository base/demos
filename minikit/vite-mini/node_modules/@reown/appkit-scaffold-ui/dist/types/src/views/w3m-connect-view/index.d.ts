import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-button';
import '@reown/appkit-ui/wui-separator';
import '../../partials/w3m-email-login-widget/index.js';
import '../../partials/w3m-legal-checkbox/index.js';
import '../../partials/w3m-legal-footer/index.js';
import '../../partials/w3m-social-login-widget/index.js';
import '../../partials/w3m-wallet-guide/index.js';
import '../../partials/w3m-wallet-login-list/index.js';
export declare class W3mConnectView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private connectors;
    private authConnector;
    private features;
    private remoteFeatures;
    private enableWallets;
    private noAdapters;
    private walletGuide;
    private checked;
    private isEmailEnabled;
    private isSocialEnabled;
    private isAuthEnabled;
    private resizeObserver?;
    constructor();
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private setEmailAndSocialEnableCheck;
    private checkIfAuthEnabled;
    private renderConnectMethod;
    private checkMethodEnabled;
    private checkIsThereNextMethod;
    private separatorTemplate;
    private emailTemplate;
    private socialListTemplate;
    private walletListTemplate;
    private guideTemplate;
    private legalCheckboxTemplate;
    private handleConnectListScroll;
    private onContinueWalletClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-view': W3mConnectView;
    }
}
