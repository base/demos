var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { AccountController, BlockchainApiController, ChainController, ConstantsUtil, CoreHelperUtil, EventsController, OnRampController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import { W3mFrameRpcConstants } from '@reown/appkit-wallet/utils';
import '../../partials/w3m-onramp-provider-item/index.js';
import '../../partials/w3m-onramp-providers-footer/index.js';
let W3mOnRampProvidersView = class W3mOnRampProvidersView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.providers = OnRampController.state.providers;
        this.unsubscribe.push(...[
            OnRampController.subscribeKey('providers', val => {
                this.providers = val;
            })
        ]);
    }
    firstUpdated() {
        const urlPromises = this.providers.map(async (provider) => {
            if (provider.name === 'coinbase') {
                return await this.getCoinbaseOnRampURL();
            }
            return Promise.resolve(provider?.url);
        });
        Promise.all(urlPromises).then(urls => {
            this.providers = this.providers.map((provider, index) => ({
                ...provider,
                url: urls[index] || ''
            }));
        });
    }
    render() {
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 's', 's', 's']} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `;
    }
    onRampProvidersTemplate() {
        return this.providers
            .filter(provider => provider.supportedChains.includes(ChainController.state.activeChain ?? 'eip155'))
            .map(provider => html `
          <w3m-onramp-provider-item
            label=${provider.label}
            name=${provider.name}
            feeRange=${provider.feeRange}
            @click=${() => {
            this.onClickProvider(provider);
        }}
            ?disabled=${!provider.url}
            data-testid=${`onramp-provider-${provider.name}`}
          ></w3m-onramp-provider-item>
        `);
    }
    onClickProvider(provider) {
        const activeChainNamespace = ChainController.state.activeChain;
        OnRampController.setSelectedProvider(provider);
        RouterController.push('BuyInProgress');
        CoreHelperUtil.openHref(provider.url, 'popupWindow', 'width=600,height=800,scrollbars=yes');
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_BUY_PROVIDER',
            properties: {
                provider: provider.name,
                isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                    W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
    }
    async getCoinbaseOnRampURL() {
        const address = AccountController.state.address;
        const network = ChainController.state.activeCaipNetwork;
        if (!address) {
            throw new Error('No address found');
        }
        if (!network?.name) {
            throw new Error('No network found');
        }
        const defaultNetwork = ConstantsUtil.WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP[network.name] ?? ConstantsUtil.WC_COINBASE_PAY_SDK_FALLBACK_CHAIN;
        const purchaseCurrency = OnRampController.state.purchaseCurrency;
        const assets = purchaseCurrency
            ? [purchaseCurrency.symbol]
            : OnRampController.state.purchaseCurrencies.map(currency => currency.symbol);
        return await BlockchainApiController.generateOnRampURL({
            defaultNetwork,
            destinationWallets: [
                { address, blockchains: ConstantsUtil.WC_COINBASE_PAY_SDK_CHAINS, assets }
            ],
            partnerUserId: address,
            purchaseAmount: OnRampController.state.purchaseAmount
        });
    }
};
__decorate([
    state()
], W3mOnRampProvidersView.prototype, "providers", void 0);
W3mOnRampProvidersView = __decorate([
    customElement('w3m-onramp-providers-view')
], W3mOnRampProvidersView);
export { W3mOnRampProvidersView };
//# sourceMappingURL=index.js.map