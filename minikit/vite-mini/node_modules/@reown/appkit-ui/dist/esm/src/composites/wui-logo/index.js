var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiLogo = class WuiLogo extends LitElement {
    constructor() {
        super(...arguments);
        this.logo = 'google';
    }
    render() {
        return html `<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `;
    }
};
WuiLogo.styles = [resetStyles, styles];
__decorate([
    property()
], WuiLogo.prototype, "logo", void 0);
WuiLogo = __decorate([
    customElement('wui-logo')
], WuiLogo);
export { WuiLogo };
//# sourceMappingURL=index.js.map