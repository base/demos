var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-icon-box/index.js';
import styles from './styles.js';
let WuiWalletImage = class WuiWalletImage extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.name = '';
        this.installed = false;
        this.badgeSize = 'xs';
    }
    render() {
        let borderRadius = 'xxs';
        if (this.size === 'lg') {
            borderRadius = 'm';
        }
        else if (this.size === 'md') {
            borderRadius = 'xs';
        }
        else {
            borderRadius = 'xxs';
        }
        this.style.cssText = `
       --local-border-radius: var(--wui-border-radius-${borderRadius});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `;
        if (this.walletIcon) {
            this.dataset['walletIcon'] = this.walletIcon;
        }
        return html `
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `;
    }
    templateVisual() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
        }
        else if (this.walletIcon) {
            return html `<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`;
        }
        return html `<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
    }
};
WuiWalletImage.styles = [elementStyles, resetStyles, styles];
__decorate([
    property()
], WuiWalletImage.prototype, "size", void 0);
__decorate([
    property()
], WuiWalletImage.prototype, "name", void 0);
__decorate([
    property()
], WuiWalletImage.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiWalletImage.prototype, "walletIcon", void 0);
__decorate([
    property({ type: Boolean })
], WuiWalletImage.prototype, "installed", void 0);
__decorate([
    property()
], WuiWalletImage.prototype, "badgeSize", void 0);
WuiWalletImage = __decorate([
    customElement('wui-wallet-image')
], WuiWalletImage);
export { WuiWalletImage };
//# sourceMappingURL=index.js.map