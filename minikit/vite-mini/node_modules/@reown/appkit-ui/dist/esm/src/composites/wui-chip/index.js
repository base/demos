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
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiChip = class WuiChip extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'fill';
        this.imageSrc = undefined;
        this.imageIcon = undefined;
        this.imageIconSize = 'md';
        this.disabled = false;
        this.icon = 'externalLink';
        this.href = '';
        this.text = undefined;
    }
    render() {
        const isSmall = this.variant === 'success' || this.variant === 'transparent' || this.variant === 'shadeSmall';
        const textVariant = isSmall ? 'small-600' : 'paragraph-600';
        return html `
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled ? 'disabled' : ''}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${textVariant} color="inherit">
          ${this.title ? this.title : UiHelperUtil.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `;
    }
    imageTemplate() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc}></wui-image>`;
        }
        if (this.imageIcon) {
            return html `<wui-icon
        name=${this.imageIcon}
        color="inherit"
        size=${this.imageIconSize}
        class="image-icon"
      ></wui-icon>`;
        }
        return null;
    }
};
WuiChip.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiChip.prototype, "variant", void 0);
__decorate([
    property()
], WuiChip.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiChip.prototype, "imageIcon", void 0);
__decorate([
    property()
], WuiChip.prototype, "imageIconSize", void 0);
__decorate([
    property({ type: Boolean })
], WuiChip.prototype, "disabled", void 0);
__decorate([
    property()
], WuiChip.prototype, "icon", void 0);
__decorate([
    property()
], WuiChip.prototype, "href", void 0);
__decorate([
    property()
], WuiChip.prototype, "text", void 0);
WuiChip = __decorate([
    customElement('wui-chip')
], WuiChip);
export { WuiChip };
//# sourceMappingURL=index.js.map