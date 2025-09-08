import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-text';
export declare class W3mAccountAuthButton extends LitElement {
    private unsubscribe;
    private socialProvider;
    private socialUsername;
    namespace: import("@reown/appkit-common").ChainNamespace | undefined;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onGoToUpdateEmail;
    private getAuthName;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-auth-button': W3mAccountAuthButton;
    }
}
