var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ApiController, ConnectorController, CoreHelperUtil, EventsController, OptionsController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-list-wallet';
let W3mAllWalletsWidget = class W3mAllWalletsWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController.state.connectors;
        this.count = ApiController.state.count;
        this.filteredCount = ApiController.state.filteredWallets.length;
        this.isFetchingRecommendedWallets = ApiController.state.isFetchingRecommendedWallets;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)), ApiController.subscribeKey('count', val => (this.count = val)), ApiController.subscribeKey('filteredWallets', val => (this.filteredCount = val.length)), ApiController.subscribeKey('isFetchingRecommendedWallets', val => (this.isFetchingRecommendedWallets = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const wcConnector = this.connectors.find(c => c.id === 'walletConnect');
        const { allWallets } = OptionsController.state;
        if (!wcConnector || allWallets === 'HIDE') {
            return null;
        }
        if (allWallets === 'ONLY_MOBILE' && !CoreHelperUtil.isMobile()) {
            return null;
        }
        const featuredCount = ApiController.state.featured.length;
        const rawCount = this.count + featuredCount;
        const roundedCount = rawCount < 10 ? rawCount : Math.floor(rawCount / 10) * 10;
        const count = this.filteredCount > 0 ? this.filteredCount : roundedCount;
        let tagLabel = `${count}`;
        if (this.filteredCount > 0) {
            tagLabel = `${this.filteredCount}`;
        }
        else if (count < rawCount) {
            tagLabel = `${count}+`;
        }
        return html `
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${tagLabel}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${ifDefined(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets ? 'fg-300' : 'accent-100'}
      ></wui-list-wallet>
    `;
    }
    onAllWallets() {
        EventsController.sendEvent({ type: 'track', event: 'CLICK_ALL_WALLETS' });
        RouterController.push('AllWallets');
    }
};
__decorate([
    property()
], W3mAllWalletsWidget.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mAllWalletsWidget.prototype, "connectors", void 0);
__decorate([
    state()
], W3mAllWalletsWidget.prototype, "count", void 0);
__decorate([
    state()
], W3mAllWalletsWidget.prototype, "filteredCount", void 0);
__decorate([
    state()
], W3mAllWalletsWidget.prototype, "isFetchingRecommendedWallets", void 0);
W3mAllWalletsWidget = __decorate([
    customElement('w3m-all-wallets-widget')
], W3mAllWalletsWidget);
export { W3mAllWalletsWidget };
//# sourceMappingURL=index.js.map