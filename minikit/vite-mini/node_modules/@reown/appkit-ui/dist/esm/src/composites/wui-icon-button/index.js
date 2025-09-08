var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiIconButton = class WuiIconButton extends LitElement {
    constructor() {
        super(...arguments);
        this.text = '';
        this.icon = 'card';
    }
    render() {
        return html `<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`;
    }
};
WuiIconButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiIconButton.prototype, "text", void 0);
__decorate([
    property()
], WuiIconButton.prototype, "icon", void 0);
WuiIconButton = __decorate([
    customElement('wui-icon-button')
], WuiIconButton);
export { WuiIconButton };
//# sourceMappingURL=index.js.map