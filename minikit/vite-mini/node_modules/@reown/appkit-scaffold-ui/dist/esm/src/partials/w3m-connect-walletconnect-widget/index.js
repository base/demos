var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetController, ConnectorController, CoreHelperUtil, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-list-wallet';
let W3mConnectWalletConnectWidget = class W3mConnectWalletConnectWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController.state.connectors;
        this.connectorImages = AssetController.state.connectorImages;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)), AssetController.subscribeKey('connectorImages', val => (this.connectorImages = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (CoreHelperUtil.isMobile()) {
            this.style.cssText = `display: none`;
            return null;
        }
        const connector = this.connectors.find(c => c.id === 'walletConnect');
        if (!connector) {
            this.style.cssText = `display: none`;
            return null;
        }
        const connectorImage = connector.imageUrl || this.connectorImages[connector?.imageId ?? ''];
        return html `
      <wui-list-wallet
        imageSrc=${ifDefined(connectorImage)}
        name=${connector.name ?? 'Unknown'}
        @click=${() => this.onConnector(connector)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${ifDefined(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `;
    }
    onConnector(connector) {
        ConnectorController.setActiveConnector(connector);
        RouterController.push('ConnectingWalletConnect');
    }
};
__decorate([
    property()
], W3mConnectWalletConnectWidget.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mConnectWalletConnectWidget.prototype, "connectors", void 0);
__decorate([
    state()
], W3mConnectWalletConnectWidget.prototype, "connectorImages", void 0);
W3mConnectWalletConnectWidget = __decorate([
    customElement('w3m-connect-walletconnect-widget')
], W3mConnectWalletConnectWidget);
export { W3mConnectWalletConnectWidget };
//# sourceMappingURL=index.js.map