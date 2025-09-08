import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
export declare class W3mEmailVerifyDeviceView extends LitElement {
    static styles: import("lit").CSSResult;
    protected readonly email: string | undefined;
    protected readonly authConnector: import("@reown/appkit-controllers").AuthConnector | undefined;
    constructor();
    private loading;
    render(): import("lit").TemplateResult<1>;
    private listenForDeviceApproval;
    private onResendCode;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-email-verify-device-view': W3mEmailVerifyDeviceView;
    }
}
