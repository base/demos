var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-text/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiSeparator = class WuiSeparator extends LitElement {
    constructor() {
        super(...arguments);
        this.text = '';
    }
    render() {
        return html `${this.template()}`;
    }
    template() {
        if (this.text) {
            return html `<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`;
        }
        return null;
    }
};
WuiSeparator.styles = [resetStyles, styles];
__decorate([
    property()
], WuiSeparator.prototype, "text", void 0);
WuiSeparator = __decorate([
    customElement('wui-separator')
], WuiSeparator);
export { WuiSeparator };
//# sourceMappingURL=index.js.map