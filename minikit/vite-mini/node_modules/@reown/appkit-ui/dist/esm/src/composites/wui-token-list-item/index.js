var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { NumberUtil } from '@reown/appkit-common';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiTokenListItem = class WuiTokenListItem extends LitElement {
    constructor() {
        super();
        this.observer = new IntersectionObserver(() => undefined);
        this.imageSrc = undefined;
        this.name = undefined;
        this.symbol = undefined;
        this.price = undefined;
        this.amount = undefined;
        this.visible = false;
        this.imageError = false;
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.visible = true;
                }
                else {
                    this.visible = false;
                }
            });
        }, { threshold: 0.1 });
    }
    firstUpdated() {
        this.observer.observe(this);
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    render() {
        if (!this.visible) {
            return null;
        }
        const value = this.amount && this.price ? NumberUtil.multiply(this.price, this.amount)?.toFixed(3) : null;
        return html `
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${value
            ? html `
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${UiHelperUtil.formatNumberToLocalString(value, 3)}
                  </wui-text>
                `
            : null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount
            ? html `<wui-text variant="small-400" color="fg-200">
                  ${UiHelperUtil.formatNumberToLocalString(this.amount, 4)}
                </wui-text>`
            : null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
    }
    visualTemplate() {
        if (this.imageError) {
            return html `<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`;
        }
        if (this.imageSrc) {
            return html `<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`;
        }
        return null;
    }
    imageLoadError() {
        this.imageError = true;
    }
};
WuiTokenListItem.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiTokenListItem.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiTokenListItem.prototype, "name", void 0);
__decorate([
    property()
], WuiTokenListItem.prototype, "symbol", void 0);
__decorate([
    property()
], WuiTokenListItem.prototype, "price", void 0);
__decorate([
    property()
], WuiTokenListItem.prototype, "amount", void 0);
__decorate([
    state()
], WuiTokenListItem.prototype, "visible", void 0);
__decorate([
    state()
], WuiTokenListItem.prototype, "imageError", void 0);
WuiTokenListItem = __decorate([
    customElement('wui-token-list-item')
], WuiTokenListItem);
export { WuiTokenListItem };
//# sourceMappingURL=index.js.map