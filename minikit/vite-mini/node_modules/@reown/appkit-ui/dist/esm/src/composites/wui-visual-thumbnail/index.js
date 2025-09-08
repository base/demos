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
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiVisualThumbnail = class WuiVisualThumbnail extends LitElement {
    render() {
        this.style.cssText = `--local-border-radius: ${this.borderRadiusFull ? '1000px' : '20px'}; background-color: var(--wui-color-modal-bg);`;
        return html `${this.templateVisual()}`;
    }
    templateVisual() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt=${this.alt ?? ''}></wui-image>`;
        }
        return html `<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
    }
};
WuiVisualThumbnail.styles = [resetStyles, styles];
__decorate([
    property()
], WuiVisualThumbnail.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiVisualThumbnail.prototype, "alt", void 0);
__decorate([
    property({ type: Boolean })
], WuiVisualThumbnail.prototype, "borderRadiusFull", void 0);
WuiVisualThumbnail = __decorate([
    customElement('wui-visual-thumbnail')
], WuiVisualThumbnail);
export { WuiVisualThumbnail };
//# sourceMappingURL=index.js.map