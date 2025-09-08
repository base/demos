var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-image/index.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-icon-box/index.js';
import styles from './styles.js';
let WuiTransactionVisual = class WuiTransactionVisual extends LitElement {
    constructor() {
        super(...arguments);
        this.images = [];
        this.secondImage = {
            type: undefined,
            url: ''
        };
    }
    render() {
        const [firstImage, secondImage] = this.images;
        const isLeftNFT = firstImage?.type === 'NFT';
        const isRightNFT = secondImage?.url ? secondImage.type === 'NFT' : isLeftNFT;
        const leftRadius = isLeftNFT ? 'var(--wui-border-radius-xxs)' : 'var(--wui-border-radius-s)';
        const rightRadius = isRightNFT ? 'var(--wui-border-radius-xxs)' : 'var(--wui-border-radius-s)';
        this.style.cssText = `
    --local-left-border-radius: ${leftRadius};
    --local-right-border-radius: ${rightRadius};
    `;
        return html `<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`;
    }
    templateVisual() {
        const [firstImage, secondImage] = this.images;
        const firstImageType = firstImage?.type;
        const haveTwoImages = this.images.length === 2;
        if (haveTwoImages && (firstImage?.url || secondImage?.url)) {
            return html `<div class="swap-images-container">
        ${firstImage?.url
                ? html `<wui-image src=${firstImage.url} alt="Transaction image"></wui-image>`
                : null}
        ${secondImage?.url
                ? html `<wui-image src=${secondImage.url} alt="Transaction image"></wui-image>`
                : null}
      </div>`;
        }
        else if (firstImage?.url) {
            return html `<wui-image src=${firstImage.url} alt="Transaction image"></wui-image>`;
        }
        else if (firstImageType === 'NFT') {
            return html `<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>`;
        }
        return html `<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`;
    }
    templateIcon() {
        let color = 'accent-100';
        let icon = undefined;
        icon = this.getIcon();
        if (this.status) {
            color = this.getStatusColor();
        }
        if (!icon) {
            return null;
        }
        return html `
      <wui-icon-box
        size="xxs"
        iconColor=${color}
        backgroundColor=${color}
        background="opaque"
        icon=${icon}
        ?border=${true}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    `;
    }
    getDirectionIcon() {
        switch (this.direction) {
            case 'in':
                return 'arrowBottom';
            case 'out':
                return 'arrowTop';
            default:
                return undefined;
        }
    }
    getIcon() {
        if (this.onlyDirectionIcon) {
            return this.getDirectionIcon();
        }
        if (this.type === 'trade') {
            return 'swapHorizontalBold';
        }
        else if (this.type === 'approve') {
            return 'checkmark';
        }
        else if (this.type === 'cancel') {
            return 'close';
        }
        return this.getDirectionIcon();
    }
    getStatusColor() {
        switch (this.status) {
            case 'confirmed':
                return 'success-100';
            case 'failed':
                return 'error-100';
            case 'pending':
                return 'inverse-100';
            default:
                return 'accent-100';
        }
    }
};
WuiTransactionVisual.styles = [styles];
__decorate([
    property()
], WuiTransactionVisual.prototype, "type", void 0);
__decorate([
    property()
], WuiTransactionVisual.prototype, "status", void 0);
__decorate([
    property()
], WuiTransactionVisual.prototype, "direction", void 0);
__decorate([
    property({ type: Boolean })
], WuiTransactionVisual.prototype, "onlyDirectionIcon", void 0);
__decorate([
    property({ type: Array })
], WuiTransactionVisual.prototype, "images", void 0);
__decorate([
    property({ type: Object })
], WuiTransactionVisual.prototype, "secondImage", void 0);
WuiTransactionVisual = __decorate([
    customElement('wui-transaction-visual')
], WuiTransactionVisual);
export { WuiTransactionVisual };
//# sourceMappingURL=index.js.map