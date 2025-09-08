var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ApiController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-image';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mOnRampActivityItem = class W3mOnRampActivityItem extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.color = 'inherit';
        this.label = 'Bought';
        this.purchaseValue = '';
        this.purchaseCurrency = '';
        this.date = '';
        this.completed = false;
        this.inProgress = false;
        this.failed = false;
        this.onClick = null;
        this.symbol = '';
    }
    firstUpdated() {
        if (!this.icon) {
            this.fetchTokenImage();
        }
    }
    render() {
        return html `
      <wui-flex>
        ${this.imageTemplate()}
        <wui-flex flexDirection="column" gap="4xs" flexGrow="1">
          <wui-flex gap="xxs" alignItems="center" justifyContent="flex-start">
            ${this.statusIconTemplate()}
            <wui-text variant="paragraph-500" color="fg-100"> ${this.label}</wui-text>
          </wui-flex>
          <wui-text variant="small-400" color="fg-200">
            + ${this.purchaseValue} ${this.purchaseCurrency}
          </wui-text>
        </wui-flex>
        ${this.inProgress
            ? html `<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`
            : html `<wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>`}
      </wui-flex>
    `;
    }
    async fetchTokenImage() {
        await ApiController._fetchTokenImage(this.purchaseCurrency);
    }
    statusIconTemplate() {
        if (this.inProgress) {
            return null;
        }
        return this.completed ? this.boughtIconTemplate() : this.errorIconTemplate();
    }
    errorIconTemplate() {
        return html `<wui-icon-box
      size="xxs"
      iconColor="error-100"
      backgroundColor="error-100"
      background="opaque"
      icon="close"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`;
    }
    imageTemplate() {
        const icon = this.icon || `https://avatar.vercel.sh/andrew.svg?size=50&text=${this.symbol}`;
        return html `<wui-flex class="purchase-image-container">
      <wui-image src=${icon}></wui-image>
    </wui-flex>`;
    }
    boughtIconTemplate() {
        return html `<wui-icon-box
      size="xxs"
      iconColor="success-100"
      backgroundColor="success-100"
      background="opaque"
      icon="arrowBottom"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`;
    }
};
W3mOnRampActivityItem.styles = [styles];
__decorate([
    property({ type: Boolean })
], W3mOnRampActivityItem.prototype, "disabled", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "color", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "label", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "purchaseValue", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "purchaseCurrency", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "date", void 0);
__decorate([
    property({ type: Boolean })
], W3mOnRampActivityItem.prototype, "completed", void 0);
__decorate([
    property({ type: Boolean })
], W3mOnRampActivityItem.prototype, "inProgress", void 0);
__decorate([
    property({ type: Boolean })
], W3mOnRampActivityItem.prototype, "failed", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "onClick", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "symbol", void 0);
__decorate([
    property()
], W3mOnRampActivityItem.prototype, "icon", void 0);
W3mOnRampActivityItem = __decorate([
    customElement('w3m-onramp-activity-item')
], W3mOnRampActivityItem);
export { W3mOnRampActivityItem };
//# sourceMappingURL=index.js.map