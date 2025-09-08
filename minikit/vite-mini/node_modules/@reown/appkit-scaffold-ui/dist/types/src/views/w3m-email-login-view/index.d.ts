import { LitElement } from 'lit';
export declare class W3mEmailLoginView extends LitElement {
    protected authConnector: import("@reown/appkit-controllers").AuthConnector | undefined;
    private isEmailEnabled;
    private isAuthEnabled;
    private connectors;
    constructor();
    render(): import("lit").TemplateResult<1>;
    private checkIfAuthEnabled;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-email-login-view': W3mEmailLoginView;
    }
}
