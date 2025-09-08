import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-list-wallet';
export declare class W3mConnectWalletConnectWidget extends LitElement {
    private unsubscribe;
    tabIdx?: number;
    private connectors;
    private connectorImages;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onConnector;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-walletconnect-widget': W3mConnectWalletConnectWidget;
    }
}
