var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, ConnectionController, ConnectorController, CoreHelperUtil, OptionsController, RouterController, StorageUtil } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
import { WalletUtil } from '../../utils/WalletUtil.js';
let W3mConnectRecommendedWidget = class W3mConnectRecommendedWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.wallets = [];
        this.loading = false;
        if (CoreHelperUtil.isTelegram() && CoreHelperUtil.isIos()) {
            this.loading = !ConnectionController.state.wcUri;
            this.unsubscribe.push(ConnectionController.subscribeKey('wcUri', val => (this.loading = !val)));
        }
    }
    render() {
        const { connectors } = ConnectorController.state;
        const { customWallets, featuredWalletIds } = OptionsController.state;
        const recentWallets = StorageUtil.getRecentWallets();
        const wcConnector = connectors.find(c => c.id === 'walletConnect');
        const injectedConnectors = connectors.filter(c => c.type === 'INJECTED' || c.type === 'ANNOUNCED' || c.type === 'MULTI_CHAIN');
        const injectedWallets = injectedConnectors.filter(i => i.name !== 'Browser Wallet');
        if (!wcConnector) {
            return null;
        }
        if (featuredWalletIds || customWallets || !this.wallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        const overrideLength = injectedWallets.length + recentWallets.length;
        const maxRecommended = Math.max(0, 2 - overrideLength);
        const wallets = WalletUtil.filterOutDuplicateWallets(this.wallets).slice(0, maxRecommended);
        if (!wallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${wallets.map(wallet => html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${wallet?.name ?? 'Unknown'}
              @click=${() => this.onConnectWallet(wallet)}
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
        const connector = ConnectorController.getConnector(wallet.id, wallet.rdns);
        if (connector) {
            RouterController.push('ConnectingExternal', { connector });
        }
        else {
            RouterController.push('ConnectingWalletConnect', { wallet });
        }
    }
};
__decorate([
    property()
], W3mConnectRecommendedWidget.prototype, "tabIdx", void 0);
__decorate([
    property()
], W3mConnectRecommendedWidget.prototype, "wallets", void 0);
__decorate([
    state()
], W3mConnectRecommendedWidget.prototype, "loading", void 0);
W3mConnectRecommendedWidget = __decorate([
    customElement('w3m-connect-recommended-widget')
], W3mConnectRecommendedWidget);
export { W3mConnectRecommendedWidget };
//# sourceMappingURL=index.js.map