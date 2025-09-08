import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-otp';
import '@reown/appkit-ui/wui-text';
export type OnOtpSubmitFn = (otp: string) => Promise<void>;
export type OnOtpResendFn = (email: string) => Promise<void>;
export type OnStartOverFn = () => void;
export declare class W3mEmailOtpWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private OTPTimeout?;
    private loading;
    private timeoutTimeLeft;
    private error;
    private otp;
    email: string | undefined;
    onOtpSubmit: OnOtpSubmitFn | undefined;
    onOtpResend: OnOtpResendFn | undefined;
    onStartOver: OnStartOverFn | undefined;
    authConnector: import("@reown/appkit-controllers").AuthConnector | undefined;
    firstUpdated(): void;
    disconnectedCallback(): void;
    constructor();
    render(): import("lit").TemplateResult<1>;
    private startOTPTimeout;
    private onOtpInputChange;
    private onResendCode;
    private getFooterLabels;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-email-otp-widget': W3mEmailOtpWidget;
    }
}
