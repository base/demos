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
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiChipButton = class WuiChipButton extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'accent';
        this.imageSrc = '';
        this.disabled = false;
        this.icon = 'externalLink';
        this.size = 'md';
        this.text = '';
    }
    render() {
        const textVariant = this.size === 'sm' ? 'small-600' : 'paragraph-600';
        return html `
      <button
        class=${this.disabled ? 'disabled' : ''}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc ? html `<wui-image src=${this.imageSrc}></wui-image>` : null}
        <wui-text variant=${textVariant} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `;
    }
};
WuiChipButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiChipButton.prototype, "variant", void 0);
__decorate([
    property()
], WuiChipButton.prototype, "imageSrc", void 0);
__decorate([
    property({ type: Boolean })
], WuiChipButton.prototype, "disabled", void 0);
__decorate([
    property()
], WuiChipButton.prototype, "icon", void 0);
__decorate([
    property()
], WuiChipButton.prototype, "size", void 0);
__decorate([
    property()
], WuiChipButton.prototype, "text", void 0);
WuiChipButton = __decorate([
    customElement('wui-chip-button')
], WuiChipButton);
export { WuiChipButton };
//# sourceMappingURL=index.js.map