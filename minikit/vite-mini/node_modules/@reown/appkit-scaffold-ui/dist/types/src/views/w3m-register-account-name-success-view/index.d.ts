import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
export declare class W3mRegisterAccountNameSuccess extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private onboardingTemplate;
    private buttonsTemplate;
    private redirectToAccount;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-register-account-name-success-view': W3mRegisterAccountNameSuccess;
    }
}
