import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-button';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-image';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-network-image';
import '@reown/appkit-ui/wui-separator';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
export declare class W3mPayView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private amount;
    private tokenSymbol;
    private networkName;
    private exchanges;
    private isLoading;
    private loadingExchangeId;
    private connectedWalletInfo;
    constructor();
    private get isWalletConnected();
    render(): import("lit").TemplateResult<1>;
    private initializePaymentDetails;
    private renderPayWithWallet;
    private renderPaymentHeader;
    private renderConnectedView;
    private renderDisconnectedView;
    private renderExchangeOptions;
    private onWalletPayment;
    private onExchangePayment;
    private onDisconnect;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-pay-view': W3mPayView;
    }
}
