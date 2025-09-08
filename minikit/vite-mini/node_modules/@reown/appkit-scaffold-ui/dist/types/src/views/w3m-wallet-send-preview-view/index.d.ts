import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-preview-item';
import '@reown/appkit-ui/wui-text';
import '../../partials/w3m-wallet-send-details/index.js';
export declare class W3mWalletSendPreviewView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private token;
    private sendTokenAmount;
    private receiverAddress;
    private receiverProfileName;
    private receiverProfileImageUrl;
    private caipNetwork;
    private loading;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private sendValueTemplate;
    onSendClick(): Promise<void>;
    private onCancelClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-send-preview-view': W3mWalletSendPreviewView;
    }
}
