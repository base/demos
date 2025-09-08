var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ApiController, ConnectorController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-grid';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
import { WalletUtil } from '../../utils/WalletUtil.js';
import '../w3m-all-wallets-list-item/index.js';
import styles from './styles.js';
let W3mAllWalletsSearch = class W3mAllWalletsSearch extends LitElement {
    constructor() {
        super(...arguments);
        this.prevQuery = '';
        this.prevBadge = undefined;
        this.loading = true;
        this.query = '';
    }
    render() {
        this.onSearch();
        return this.loading
            ? html `<wui-loading-spinner color="accent-100"></wui-loading-spinner>`
            : this.walletsTemplate();
    }
    async onSearch() {
        if (this.query.trim() !== this.prevQuery.trim() || this.badge !== this.prevBadge) {
            this.prevQuery = this.query;
            this.prevBadge = this.badge;
            this.loading = true;
            await ApiController.searchWallet({ search: this.query, badge: this.badge });
            this.loading = false;
        }
    }
    walletsTemplate() {
        const { search } = ApiController.state;
        const wallets = WalletUtil.markWalletsAsInstalled(search);
        if (!search.length) {
            return html `
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `;
        }
        return html `
      <wui-grid
        data-testid="wallet-list"
        .padding=${['0', 's', 's', 's']}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${wallets.map(wallet => html `
            <w3m-all-wallets-list-item
              @click=${() => this.onConnectWallet(wallet)}
              .wallet=${wallet}
              data-testid="wallet-search-item-${wallet.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `;
    }
    onConnectWallet(wallet) {
        ConnectorController.selectWalletConnector(wallet);
    }
};
W3mAllWalletsSearch.styles = styles;
__decorate([
    state()
], W3mAllWalletsSearch.prototype, "loading", void 0);
__decorate([
    property()
], W3mAllWalletsSearch.prototype, "query", void 0);
__decorate([
    property()
], W3mAllWalletsSearch.prototype, "badge", void 0);
W3mAllWalletsSearch = __decorate([
    customElement('w3m-all-wallets-search')
], W3mAllWalletsSearch);
export { W3mAllWalletsSearch };
//# sourceMappingURL=index.js.map