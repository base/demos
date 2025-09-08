var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { colorStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiImage = class WuiImage extends LitElement {
    constructor() {
        super(...arguments);
        this.src = './path/to/image.jpg';
        this.alt = 'Image';
        this.size = undefined;
    }
    render() {
        this.style.cssText = `
      --local-width: ${this.size ? `var(--wui-icon-size-${this.size});` : '100%'};
      --local-height: ${this.size ? `var(--wui-icon-size-${this.size});` : '100%'};
      `;
        return html `<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`;
    }
    handleImageError() {
        this.dispatchEvent(new CustomEvent('onLoadError', { bubbles: true, composed: true }));
    }
};
WuiImage.styles = [resetStyles, colorStyles, styles];
__decorate([
    property()
], WuiImage.prototype, "src", void 0);
__decorate([
    property()
], WuiImage.prototype, "alt", void 0);
__decorate([
    property()
], WuiImage.prototype, "size", void 0);
WuiImage = __decorate([
    customElement('wui-image')
], WuiImage);
export { WuiImage };
//# sourceMappingURL=index.js.map