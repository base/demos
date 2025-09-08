import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-balance';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-button';
import '@reown/appkit-ui/wui-profile-button';
import '@reown/appkit-ui/wui-tabs';
import '@reown/appkit-ui/wui-tooltip';
import '../w3m-account-activity-widget/index.js';
import '../w3m-account-nfts-widget/index.js';
import '../w3m-account-tokens-widget/index.js';
import '../w3m-tooltip-trigger/index.js';
import '../w3m-tooltip/index.js';
export declare class W3mAccountWalletFeaturesWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private watchTokenBalance?;
    private unsubscribe;
    private address;
    private profileImage;
    private profileName;
    private network;
    private currentTab;
    private tokenBalance;
    private features;
    private remoteFeatures;
    private networkImage;
    constructor();
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private orderedWalletFeatures;
    private onrampTemplate;
    private swapsTemplate;
    private receiveTemplate;
    private sendTemplate;
    private watchSwapValues;
    private onTokenBalanceError;
    private listContentTemplate;
    private tokenBalanceTemplate;
    private tabsTemplate;
    private onTabChange;
    private onProfileButtonClick;
    private onBuyClick;
    private onSwapClick;
    private onReceiveClick;
    private onSendClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-wallet-features-widget': W3mAccountWalletFeaturesWidget;
    }
}
