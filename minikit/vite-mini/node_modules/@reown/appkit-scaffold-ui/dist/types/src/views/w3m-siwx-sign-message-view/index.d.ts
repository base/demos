import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '../../partials/w3m-siwx-sign-message-thumbnails/index.js';
export declare class W3mSIWXSignMessageView extends LitElement {
    private readonly dappName;
    private isCancelling;
    private isSigning;
    render(): import("lit").TemplateResult<1>;
    private onSign;
    private onCancel;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-siwx-sign-message-view': W3mSIWXSignMessageView;
    }
}
