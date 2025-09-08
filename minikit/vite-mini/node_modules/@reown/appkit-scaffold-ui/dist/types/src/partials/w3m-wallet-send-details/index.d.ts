import { LitElement } from 'lit';
import { type CaipNetwork } from '@reown/appkit-common';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-content';
import '@reown/appkit-ui/wui-text';
export declare class W3mWalletSendDetails extends LitElement {
    static styles: import("lit").CSSResult;
    receiverAddress?: string;
    caipNetwork?: CaipNetwork;
    render(): import("lit").TemplateResult<1>;
    private networkTemplate;
    private onNetworkClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-send-details': W3mWalletSendDetails;
    }
}
