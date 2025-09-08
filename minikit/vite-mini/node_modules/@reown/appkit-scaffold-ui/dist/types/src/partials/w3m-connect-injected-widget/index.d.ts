import { LitElement } from 'lit';
import type { ConnectorWithProviders } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
export declare class W3mConnectInjectedWidget extends LitElement {
    tabIdx?: number;
    connectors: ConnectorWithProviders[];
    render(): import("lit").TemplateResult<1> | null;
    private onConnector;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-injected-widget': W3mConnectInjectedWidget;
    }
}
