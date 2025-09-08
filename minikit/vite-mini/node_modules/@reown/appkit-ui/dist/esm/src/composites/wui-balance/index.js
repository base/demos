var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiBalance = class WuiBalance extends LitElement {
    constructor() {
        super(...arguments);
        this.dollars = '0';
        this.pennies = '00';
    }
    render() {
        return html `<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`;
    }
};
WuiBalance.styles = [resetStyles, styles];
__decorate([
    property()
], WuiBalance.prototype, "dollars", void 0);
__decorate([
    property()
], WuiBalance.prototype, "pennies", void 0);
WuiBalance = __decorate([
    customElement('wui-balance')
], WuiBalance);
export { WuiBalance };
//# sourceMappingURL=index.js.map