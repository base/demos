var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-shimmer';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
import styles from './styles.js';
let W3mAllWalletsListItem = class W3mAllWalletsListItem extends LitElement {
    constructor() {
        super();
        this.observer = new IntersectionObserver(() => undefined);
        this.visible = false;
        this.imageSrc = undefined;
        this.imageLoading = false;
        this.wallet = undefined;
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.visible = true;
                    this.fetchImageSrc();
                }
                else {
                    this.visible = false;
                }
            });
        }, { threshold: 0.01 });
    }
    firstUpdated() {
        this.observer.observe(this);
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    render() {
        const certified = this.wallet?.badge_type === 'certified';
        return html `
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${ifDefined(certified ? 'certified' : undefined)}
            >${this.wallet?.name}</wui-text
          >
          ${certified ? html `<wui-icon size="sm" name="walletConnectBrown"></wui-icon>` : null}
        </wui-flex>
      </button>
    `;
    }
    imageTemplate() {
        if ((!this.visible && !this.imageSrc) || this.imageLoading) {
            return this.shimmerTemplate();
        }
        return html `
      <wui-wallet-image
        size="md"
        imageSrc=${ifDefined(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `;
    }
    shimmerTemplate() {
        return html `<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
    }
    async fetchImageSrc() {
        if (!this.wallet) {
            return;
        }
        this.imageSrc = AssetUtil.getWalletImage(this.wallet);
        if (this.imageSrc) {
            return;
        }
        this.imageLoading = true;
        this.imageSrc = await AssetUtil.fetchWalletImage(this.wallet.image_id);
        this.imageLoading = false;
    }
};
W3mAllWalletsListItem.styles = styles;
__decorate([
    state()
], W3mAllWalletsListItem.prototype, "visible", void 0);
__decorate([
    state()
], W3mAllWalletsListItem.prototype, "imageSrc", void 0);
__decorate([
    state()
], W3mAllWalletsListItem.prototype, "imageLoading", void 0);
__decorate([
    property()
], W3mAllWalletsListItem.prototype, "wallet", void 0);
W3mAllWalletsListItem = __decorate([
    customElement('w3m-all-wallets-list-item')
], W3mAllWalletsListItem);
export { W3mAllWalletsListItem };
//# sourceMappingURL=index.js.map