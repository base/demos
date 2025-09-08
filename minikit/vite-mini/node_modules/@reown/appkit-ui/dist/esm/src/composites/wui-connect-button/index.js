var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiConnectButton = class WuiConnectButton extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.loading = false;
    }
    render() {
        const textVariant = this.size === 'md' ? 'paragraph-600' : 'small-600';
        return html `
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${textVariant} color=${this.loading ? 'accent-100' : 'inherit'}>
          <slot></slot>
        </wui-text>
      </button>
    `;
    }
    loadingTemplate() {
        if (!this.loading) {
            return null;
        }
        return html `<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`;
    }
};
WuiConnectButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiConnectButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], WuiConnectButton.prototype, "loading", void 0);
WuiConnectButton = __decorate([
    customElement('wui-connect-button')
], WuiConnectButton);
export { WuiConnectButton };
//# sourceMappingURL=index.js.map