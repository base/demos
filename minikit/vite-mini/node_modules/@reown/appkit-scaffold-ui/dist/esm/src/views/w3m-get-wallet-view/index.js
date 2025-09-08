var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ApiController, AssetUtil, CoreHelperUtil, OptionsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-item';
const EXPLORER = 'https://walletconnect.com/explorer';
let W3mGetWalletView = class W3mGetWalletView extends LitElement {
    render() {
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 's', 's', 's']} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${() => {
            CoreHelperUtil.openHref('https://walletconnect.com/explorer?type=wallet', '_blank');
        }}
        ></wui-list-wallet>
      </wui-flex>
    `;
    }
    recommendedWalletsTemplate() {
        const { recommended, featured } = ApiController.state;
        const { customWallets } = OptionsController.state;
        const wallets = [...featured, ...(customWallets ?? []), ...recommended].slice(0, 4);
        return wallets.map(wallet => html `
        <wui-list-wallet
          name=${wallet.name ?? 'Unknown'}
          tagVariant="main"
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          @click=${() => {
            CoreHelperUtil.openHref(wallet.homepage ?? EXPLORER, '_blank');
        }}
        ></wui-list-wallet>
      `);
    }
};
W3mGetWalletView = __decorate([
    customElement('w3m-get-wallet-view')
], W3mGetWalletView);
export { W3mGetWalletView };
//# sourceMappingURL=index.js.map