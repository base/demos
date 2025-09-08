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
import styles from './styles.js';
let WuiListButton = class WuiListButton extends LitElement {
    constructor() {
        super(...arguments);
        this.text = '';
        this.disabled = false;
        this.tabIdx = undefined;
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} tabindex=${ifDefined(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `;
    }
};
WuiListButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListButton.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], WuiListButton.prototype, "disabled", void 0);
__decorate([
    property()
], WuiListButton.prototype, "tabIdx", void 0);
WuiListButton = __decorate([
    customElement('wui-list-button')
], WuiListButton);
export { WuiListButton };
//# sourceMappingURL=index.js.map