var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-logo/index.js';
import styles from './styles.js';
let WuiLogoSelect = class WuiLogoSelect extends LitElement {
    constructor() {
        super(...arguments);
        this.logo = 'google';
        this.disabled = false;
        this.tabIdx = undefined;
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} tabindex=${ifDefined(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `;
    }
};
WuiLogoSelect.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiLogoSelect.prototype, "logo", void 0);
__decorate([
    property({ type: Boolean })
], WuiLogoSelect.prototype, "disabled", void 0);
__decorate([
    property()
], WuiLogoSelect.prototype, "tabIdx", void 0);
WuiLogoSelect = __decorate([
    customElement('wui-logo-select')
], WuiLogoSelect);
export { WuiLogoSelect };
//# sourceMappingURL=index.js.map