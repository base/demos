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
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-network-image/index.js';
import styles from './styles.js';
let WuiListNetwork = class WuiListNetwork extends LitElement {
    constructor() {
        super(...arguments);
        this.imageSrc = '';
        this.name = '';
        this.disabled = false;
        this.selected = false;
        this.transparent = false;
    }
    render() {
        return html `
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `;
    }
    checkmarkTemplate() {
        if (this.selected) {
            return html `<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`;
        }
        return null;
    }
    templateNetworkImage() {
        if (this.imageSrc) {
            return html `<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`;
        }
        if (!this.imageSrc) {
            return html `<wui-network-image
        ?round=${true}
        size="md"
        name=${this.name}
      ></wui-network-image>`;
        }
        return null;
    }
};
WuiListNetwork.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListNetwork.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiListNetwork.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], WuiListNetwork.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WuiListNetwork.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], WuiListNetwork.prototype, "transparent", void 0);
WuiListNetwork = __decorate([
    customElement('wui-list-network')
], WuiListNetwork);
export { WuiListNetwork };
//# sourceMappingURL=index.js.map