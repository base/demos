var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ChainController, CoreHelperUtil, RouterController, SendController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-input-text';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-list-token';
import '@reown/appkit-ui/wui-separator';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mSendSelectTokenView = class W3mSendSelectTokenView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tokenBalances = SendController.state.tokenBalances;
        this.search = '';
        this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
            this.search = value;
        });
        this.unsubscribe.push(...[
            SendController.subscribe(val => {
                this.tokenBalances = val.tokenBalances;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `;
    }
    templateSearchInput() {
        return html `
      <wui-flex gap="xs" padding="s">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
    }
    templateTokens() {
        this.tokens = this.tokenBalances?.filter(token => token.chainId === ChainController.state.activeCaipNetwork?.caipNetworkId);
        if (this.search) {
            this.filteredTokens = this.tokenBalances?.filter(token => token.name.toLowerCase().includes(this.search.toLowerCase()));
        }
        else {
            this.filteredTokens = this.tokens;
        }
        return html `
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${['0', 's', '0', 's']}
      >
        <wui-flex justifyContent="flex-start" .padding=${['m', 's', 's', 's']}>
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="xs">
          ${this.filteredTokens && this.filteredTokens.length > 0
            ? this.filteredTokens.map(token => html `<wui-list-token
                    @click=${this.handleTokenClick.bind(this, token)}
                    ?clickable=${true}
                    tokenName=${token.name}
                    tokenImageUrl=${token.iconUrl}
                    tokenAmount=${token.quantity.numeric}
                    tokenValue=${token.value}
                    tokenCurrency=${token.symbol}
                  ></wui-list-token>`)
            : html `<wui-flex
                .padding=${['4xl', '0', '0', '0']}
                alignItems="center"
                flexDirection="column"
                gap="l"
              >
                <wui-icon-box
                  icon="coinPlaceholder"
                  size="inherit"
                  iconColor="fg-200"
                  backgroundColor="fg-200"
                  iconSize="lg"
                ></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="xs"
                  flexDirection="column"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <wui-text variant="paragraph-500" align="center" color="fg-100"
                    >No tokens found</wui-text
                  >
                  <wui-text variant="small-400" align="center" color="fg-200"
                    >Your tokens will appear here</wui-text
                  >
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `;
    }
    onBuyClick() {
        RouterController.push('OnRampProviders');
    }
    onInputChange(event) {
        this.onDebouncedSearch(event.detail);
    }
    handleTokenClick(token) {
        SendController.setToken(token);
        SendController.setTokenAmount(undefined);
        RouterController.goBack();
    }
};
W3mSendSelectTokenView.styles = styles;
__decorate([
    state()
], W3mSendSelectTokenView.prototype, "tokenBalances", void 0);
__decorate([
    state()
], W3mSendSelectTokenView.prototype, "tokens", void 0);
__decorate([
    state()
], W3mSendSelectTokenView.prototype, "filteredTokens", void 0);
__decorate([
    state()
], W3mSendSelectTokenView.prototype, "search", void 0);
W3mSendSelectTokenView = __decorate([
    customElement('w3m-wallet-send-select-token-view')
], W3mSendSelectTokenView);
export { W3mSendSelectTokenView };
//# sourceMappingURL=index.js.map