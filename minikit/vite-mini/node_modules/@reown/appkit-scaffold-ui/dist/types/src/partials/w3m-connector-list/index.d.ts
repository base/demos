import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-connect-announced-widget/index.js';
import '../../partials/w3m-connect-custom-widget/index.js';
import '../../partials/w3m-connect-external-widget/index.js';
import '../../partials/w3m-connect-featured-widget/index.js';
import '../../partials/w3m-connect-injected-widget/index.js';
import '../../partials/w3m-connect-multi-chain-widget/index.js';
import '../../partials/w3m-connect-recent-widget/index.js';
import '../../partials/w3m-connect-recommended-widget/index.js';
import '../../partials/w3m-connect-walletconnect-widget/index.js';
export declare class W3mConnectorList extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    tabIdx?: number;
    private connectors;
    private recommended;
    private featured;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private connectorListTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connector-list': W3mConnectorList;
    }
}
