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
let WuiTokenButton = class WuiTokenButton extends LitElement {
    constructor() {
        super(...arguments);
        this.text = '';
    }
    render() {
        return html `
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `;
    }
    tokenTemplate() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc}></wui-image>`;
        }
        return html `
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
    }
};
WuiTokenButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiTokenButton.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiTokenButton.prototype, "text", void 0);
WuiTokenButton = __decorate([
    customElement('wui-token-button')
], WuiTokenButton);
export { WuiTokenButton };
//# sourceMappingURL=index.js.map