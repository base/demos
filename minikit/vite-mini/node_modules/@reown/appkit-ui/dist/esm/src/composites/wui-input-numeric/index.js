var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiInputNumeric = class WuiInputNumeric extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.value = '';
    }
    render() {
        return html `<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `;
    }
};
WuiInputNumeric.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Boolean })
], WuiInputNumeric.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], WuiInputNumeric.prototype, "value", void 0);
WuiInputNumeric = __decorate([
    customElement('wui-input-numeric')
], WuiInputNumeric);
export { WuiInputNumeric };
//# sourceMappingURL=index.js.map