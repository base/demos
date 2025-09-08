var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-icon-box/index.js';
import styles from './styles.js';
let WuiNetworkButton = class WuiNetworkButton extends LitElement {
    constructor() {
        super(...arguments);
        this.imageSrc = undefined;
        this.isUnsupportedChain = undefined;
        this.disabled = false;
    }
    render() {
        return html `
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `;
    }
    visualTemplate() {
        if (this.isUnsupportedChain) {
            return html `
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `;
        }
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc}></wui-image>`;
        }
        return html `
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
    }
};
WuiNetworkButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiNetworkButton.prototype, "imageSrc", void 0);
__decorate([
    property({ type: Boolean })
], WuiNetworkButton.prototype, "isUnsupportedChain", void 0);
__decorate([
    property({ type: Boolean })
], WuiNetworkButton.prototype, "disabled", void 0);
WuiNetworkButton = __decorate([
    customElement('wui-network-button')
], WuiNetworkButton);
export { WuiNetworkButton };
//# sourceMappingURL=index.js.map