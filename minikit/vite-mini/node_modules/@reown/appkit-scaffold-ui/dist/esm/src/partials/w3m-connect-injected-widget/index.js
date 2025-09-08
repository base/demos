var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, ConnectorController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
import { ConnectorUtil } from '../../utils/ConnectorUtil.js';
let W3mConnectInjectedWidget = class W3mConnectInjectedWidget extends LitElement {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
        this.connectors = [];
    }
    render() {
        const injectedConnectors = this.connectors.filter(ConnectorUtil.showConnector);
        if (injectedConnectors.length === 0) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${injectedConnectors.map(connector => html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? 'Unknown'}
              tagVariant="success"
              tagLabel="installed"
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
        RouterController.push('ConnectingExternal', { connector });
    }
};
__decorate([
    property()
], W3mConnectInjectedWidget.prototype, "tabIdx", void 0);
__decorate([
    property()
], W3mConnectInjectedWidget.prototype, "connectors", void 0);
W3mConnectInjectedWidget = __decorate([
    customElement('w3m-connect-injected-widget')
], W3mConnectInjectedWidget);
export { W3mConnectInjectedWidget };
//# sourceMappingURL=index.js.map