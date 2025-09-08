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
import '../../composites/wui-icon-box/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-tag/index.js';
import styles from './styles.js';
let WuiListDescription = class WuiListDescription extends LitElement {
    constructor() {
        super(...arguments);
        this.icon = 'card';
        this.text = '';
        this.description = '';
        this.tag = undefined;
        this.iconBackgroundColor = 'accent-100';
        this.iconColor = 'accent-100';
        this.disabled = false;
    }
    render() {
        return html `
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          <wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text></wui-flex
        >
      </button>
    `;
    }
    titleTemplate() {
        if (this.tag) {
            return html ` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`;
        }
        return html `<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`;
    }
};
WuiListDescription.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListDescription.prototype, "icon", void 0);
__decorate([
    property()
], WuiListDescription.prototype, "text", void 0);
__decorate([
    property()
], WuiListDescription.prototype, "description", void 0);
__decorate([
    property()
], WuiListDescription.prototype, "tag", void 0);
__decorate([
    property()
], WuiListDescription.prototype, "iconBackgroundColor", void 0);
__decorate([
    property()
], WuiListDescription.prototype, "iconColor", void 0);
__decorate([
    property({ type: Boolean })
], WuiListDescription.prototype, "disabled", void 0);
WuiListDescription = __decorate([
    customElement('wui-list-description')
], WuiListDescription);
export { WuiListDescription };
//# sourceMappingURL=index.js.map