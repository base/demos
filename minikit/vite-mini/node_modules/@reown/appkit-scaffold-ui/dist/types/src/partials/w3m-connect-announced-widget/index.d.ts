import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
export declare class W3mConnectAnnouncedWidget extends LitElement {
    private unsubscribe;
    tabIdx?: number;
    private connectors;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onConnector;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-announced-widget': W3mConnectAnnouncedWidget;
    }
}
