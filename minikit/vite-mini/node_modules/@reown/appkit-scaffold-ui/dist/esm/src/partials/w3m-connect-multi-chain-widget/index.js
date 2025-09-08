var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, ConnectorController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
let W3mConnectMultiChainWidget = class W3mConnectMultiChainWidget extends LitElement {
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
        const multiChainConnectors = this.connectors.filter(connector => connector.type === 'MULTI_CHAIN' && connector.name !== 'WalletConnect');
        if (!multiChainConnectors?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${multiChainConnectors.map(connector => html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? 'Unknown'}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnector(connector) {
        ConnectorController.setActiveConnector(connector);
        RouterController.push('ConnectingMultiChain');
    }
};
__decorate([
    property()
], W3mConnectMultiChainWidget.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mConnectMultiChainWidget.prototype, "connectors", void 0);
W3mConnectMultiChainWidget = __decorate([
    customElement('w3m-connect-multi-chain-widget')
], W3mConnectMultiChainWidget);
export { W3mConnectMultiChainWidget };
//# sourceMappingURL=index.js.map