var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-logo/index.js';
import styles from './styles.js';
let WuiListSocial = class WuiListSocial extends LitElement {
    constructor() {
        super(...arguments);
        this.logo = 'google';
        this.name = 'Continue with google';
        this.align = 'left';
        this.disabled = false;
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} tabindex=${ifDefined(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `;
    }
    templatePlacement() {
        if (this.align === 'center') {
            return html ` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`;
        }
        return null;
    }
};
WuiListSocial.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListSocial.prototype, "logo", void 0);
__decorate([
    property()
], WuiListSocial.prototype, "name", void 0);
__decorate([
    property()
], WuiListSocial.prototype, "align", void 0);
__decorate([
    property()
], WuiListSocial.prototype, "tabIdx", void 0);
__decorate([
    property({ type: Boolean })
], WuiListSocial.prototype, "disabled", void 0);
WuiListSocial = __decorate([
    customElement('wui-list-social')
], WuiListSocial);
export { WuiListSocial };
//# sourceMappingURL=index.js.map