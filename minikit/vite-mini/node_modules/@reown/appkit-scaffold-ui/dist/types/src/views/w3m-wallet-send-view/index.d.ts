import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '../../partials/w3m-input-address/index.js';
import '../../partials/w3m-input-token/index.js';
export declare class W3mWalletSendView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private token;
    private sendTokenAmount;
    private receiverAddress;
    private receiverProfileName;
    private loading;
    private message;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private fetchBalances;
    private fetchNetworkPrice;
    private onButtonClick;
    private getMessage;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-send-view': W3mWalletSendView;
    }
}
