var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, ConnectorController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
let W3mConnectFeaturedWidget = class W3mConnectFeaturedWidget extends LitElement {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
        this.wallets = [];
    }
    render() {
        if (!this.wallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(wallet => html `
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${wallet.id}`}
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${wallet.name ?? 'Unknown'}
              @click=${() => this.onConnectWallet(wallet)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnectWallet(wallet) {
        ConnectorController.selectWalletConnector(wallet);
    }
};
__decorate([
    property()
], W3mConnectFeaturedWidget.prototype, "tabIdx", void 0);
__decorate([
    property()
], W3mConnectFeaturedWidget.prototype, "wallets", void 0);
W3mConnectFeaturedWidget = __decorate([
    customElement('w3m-connect-featured-widget')
], W3mConnectFeaturedWidget);
export { W3mConnectFeaturedWidget };
//# sourceMappingURL=index.js.map