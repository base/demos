var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-list-item/index.js';
import styles from './styles.js';
let WuiDropdownMenu = class WuiDropdownMenu extends LitElement {
    constructor() {
        super(...arguments);
        this.actions = [];
        this.isOpen = false;
    }
    render() {
        if (!this.isOpen) {
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="4xs">
        ${this.actions.map(action => html `
            <wui-list-item
              icon=${action.icon}
              iconSize="sm"
              variant="icon"
              @click=${action.onClick}
            >
              <wui-text variant="small-400" color="fg-100">${action.label}</wui-text>
            </wui-list-item>
          `)}
      </wui-flex>
    `;
    }
};
WuiDropdownMenu.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Array })
], WuiDropdownMenu.prototype, "actions", void 0);
__decorate([
    property({ type: Boolean })
], WuiDropdownMenu.prototype, "isOpen", void 0);
WuiDropdownMenu = __decorate([
    customElement('wui-dropdown-menu')
], WuiDropdownMenu);
export { WuiDropdownMenu };
//# sourceMappingURL=index.js.map