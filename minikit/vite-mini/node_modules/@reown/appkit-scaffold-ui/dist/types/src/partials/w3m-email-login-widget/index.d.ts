import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-email-input';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
export declare class W3mEmailLoginWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private formRef;
    tabIdx?: number;
    email: string;
    private loading;
    private error;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private submitButtonTemplate;
    private loadingTemplate;
    private templateError;
    private onEmailInputChange;
    private onSubmitEmail;
    private onFocusEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-email-login-widget': W3mEmailLoginWidget;
    }
}
