var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { AssetUtil, ConnectorController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
import { ConnectorUtil } from '../../utils/ConnectorUtil.js';
let W3mConnectExternalWidget = class W3mConnectExternalWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController.state.connectors;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const externalConnectors = this.connectors.filter(connector => connector.type === 'EXTERNAL');
        const filteredOutExcludedConnectors = externalConnectors.filter(ConnectorUtil.showConnector);
        const filteredOutCoinbaseConnectors = filteredOutExcludedConnectors.filter(connector => connector.id !== ConstantsUtil.CONNECTOR_ID.COINBASE_SDK);
        if (!filteredOutCoinbaseConnectors?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${filteredOutCoinbaseConnectors.map(connector => html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? 'Unknown'}
              data-testid=${`wallet-selector-external-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnector(connector) {
        RouterController.push('ConnectingExternal', { connector });
    }
};
__decorate([
    property()
], W3mConnectExternalWidget.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mConnectExternalWidget.prototype, "connectors", void 0);
W3mConnectExternalWidget = __decorate([
    customElement('w3m-connect-external-widget')
], W3mConnectExternalWidget);
export { W3mConnectExternalWidget };
//# sourceMappingURL=index.js.map