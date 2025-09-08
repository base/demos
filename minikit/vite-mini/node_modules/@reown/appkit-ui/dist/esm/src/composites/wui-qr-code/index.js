var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, svg } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import { QrCodeUtil } from '../../utils/QrCode.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
const DEFAULT_ICON_COLOR = '#3396ff';
let WuiQrCode = class WuiQrCode extends LitElement {
    constructor() {
        super(...arguments);
        this.uri = '';
        this.size = 0;
        this.theme = 'dark';
        this.imageSrc = undefined;
        this.alt = undefined;
        this.arenaClear = undefined;
        this.farcaster = undefined;
    }
    render() {
        this.dataset['theme'] = this.theme;
        this.dataset['clear'] = String(this.arenaClear);
        this.style.cssText = `
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color ?? DEFAULT_ICON_COLOR}
    `;
        return html `${this.templateVisual()} ${this.templateSvg()}`;
    }
    templateSvg() {
        const size = this.theme === 'light' ? this.size : this.size - 16 * 2;
        return svg `
      <svg height=${size} width=${size}>
        ${QrCodeUtil.generate({
            uri: this.uri,
            size,
            logoSize: this.arenaClear ? 0 : size / 4,
            dotColor: this.color
        })}
      </svg>
    `;
    }
    templateVisual() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt=${this.alt ?? 'logo'}></wui-image>`;
        }
        if (this.farcaster) {
            return html `<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`;
        }
        return html `<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`;
    }
};
WuiQrCode.styles = [resetStyles, styles];
__decorate([
    property()
], WuiQrCode.prototype, "uri", void 0);
__decorate([
    property({ type: Number })
], WuiQrCode.prototype, "size", void 0);
__decorate([
    property()
], WuiQrCode.prototype, "theme", void 0);
__decorate([
    property()
], WuiQrCode.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiQrCode.prototype, "alt", void 0);
__decorate([
    property()
], WuiQrCode.prototype, "color", void 0);
__decorate([
    property({ type: Boolean })
], WuiQrCode.prototype, "arenaClear", void 0);
__decorate([
    property({ type: Boolean })
], WuiQrCode.prototype, "farcaster", void 0);
WuiQrCode = __decorate([
    customElement('wui-qr-code')
], WuiQrCode);
export { WuiQrCode };
//# sourceMappingURL=index.js.map