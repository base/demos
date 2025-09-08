import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-email-input';
import '@reown/appkit-ui/wui-flex';
export declare class W3mUpdateEmailWalletView extends LitElement {
    static styles: import("lit").CSSResult;
    private formRef;
    private initialEmail;
    private redirectView;
    private email;
    private loading;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private onEmailInputChange;
    private onSubmitEmail;
    private buttonsTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-update-email-wallet-view': W3mUpdateEmailWalletView;
    }
}
