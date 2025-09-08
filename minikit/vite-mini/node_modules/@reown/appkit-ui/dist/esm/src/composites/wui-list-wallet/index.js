var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import '../../composites/wui-icon-box/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-all-wallets-image/index.js';
import '../wui-tag/index.js';
import '../wui-wallet-image/index.js';
import styles from './styles.js';
let WuiListWallet = class WuiListWallet extends LitElement {
    constructor() {
        super(...arguments);
        this.walletImages = [];
        this.imageSrc = '';
        this.name = '';
        this.tabIdx = undefined;
        this.installed = false;
        this.disabled = false;
        this.showAllWallets = false;
        this.loading = false;
        this.loadingSpinnerColor = 'accent-100';
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} tabindex=${ifDefined(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `;
    }
    templateAllWallets() {
        if (this.showAllWallets && this.imageSrc) {
            return html ` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `;
        }
        else if (this.showAllWallets && this.walletIcon) {
            return html ` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `;
        }
        return null;
    }
    templateWalletImage() {
        if (!this.showAllWallets && this.imageSrc) {
            return html `<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`;
        }
        else if (!this.showAllWallets && !this.imageSrc) {
            return html `<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`;
        }
        return null;
    }
    templateStatus() {
        if (this.loading) {
            return html `<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`;
        }
        else if (this.tagLabel && this.tagVariant) {
            return html `<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`;
        }
        else if (this.icon) {
            return html `<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`;
        }
        return null;
    }
};
WuiListWallet.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Array })
], WuiListWallet.prototype, "walletImages", void 0);
__decorate([
    property()
], WuiListWallet.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiListWallet.prototype, "name", void 0);
__decorate([
    property()
], WuiListWallet.prototype, "tagLabel", void 0);
__decorate([
    property()
], WuiListWallet.prototype, "tagVariant", void 0);
__decorate([
    property()
], WuiListWallet.prototype, "icon", void 0);
__decorate([
    property()
], WuiListWallet.prototype, "walletIcon", void 0);
__decorate([
    property()
], WuiListWallet.prototype, "tabIdx", void 0);
__decorate([
    property({ type: Boolean })
], WuiListWallet.prototype, "installed", void 0);
__decorate([
    property({ type: Boolean })
], WuiListWallet.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WuiListWallet.prototype, "showAllWallets", void 0);
__decorate([
    property({ type: Boolean })
], WuiListWallet.prototype, "loading", void 0);
__decorate([
    property({ type: String })
], WuiListWallet.prototype, "loadingSpinnerColor", void 0);
WuiListWallet = __decorate([
    customElement('wui-list-wallet')
], WuiListWallet);
export { WuiListWallet };
//# sourceMappingURL=index.js.map