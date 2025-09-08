var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, ChainController, ConnectionController, ConnectorController, CoreHelperUtil, StorageUtil } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
import { WalletUtil } from '../../utils/WalletUtil.js';
let W3mConnectRecentWidget = class W3mConnectRecentWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController.state.connectors;
        this.loading = false;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)));
        if (CoreHelperUtil.isTelegram() && CoreHelperUtil.isIos()) {
            this.loading = !ConnectionController.state.wcUri;
            this.unsubscribe.push(ConnectionController.subscribeKey('wcUri', val => (this.loading = !val)));
        }
    }
    render() {
        const recentWallets = StorageUtil.getRecentWallets();
        const filteredRecentWallets = recentWallets
            .filter(wallet => !WalletUtil.isExcluded(wallet))
            .filter(wallet => !this.hasWalletConnector(wallet))
            .filter(wallet => this.isWalletCompatibleWithCurrentChain(wallet));
        if (!filteredRecentWallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${filteredRecentWallets.map(wallet => html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${wallet.name ?? 'Unknown'}
              @click=${() => this.onConnectWallet(wallet)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${ifDefined(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnectWallet(wallet) {
        if (this.loading) {
            return;
        }
        ConnectorController.selectWalletConnector(wallet);
    }
    hasWalletConnector(wallet) {
        return this.connectors.some(connector => connector.id === wallet.id || connector.name === wallet.name);
    }
    isWalletCompatibleWithCurrentChain(wallet) {
        const currentNamespace = ChainController.state.activeChain;
        if (currentNamespace && wallet.chains) {
            return wallet.chains.some(c => {
                const chainNamespace = c.split(':')[0];
                return currentNamespace === chainNamespace;
            });
        }
        return true;
    }
};
__decorate([
    property()
], W3mConnectRecentWidget.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mConnectRecentWidget.prototype, "connectors", void 0);
__decorate([
    state()
], W3mConnectRecentWidget.prototype, "loading", void 0);
W3mConnectRecentWidget = __decorate([
    customElement('w3m-connect-recent-widget')
], W3mConnectRecentWidget);
export { W3mConnectRecentWidget };
//# sourceMappingURL=index.js.map