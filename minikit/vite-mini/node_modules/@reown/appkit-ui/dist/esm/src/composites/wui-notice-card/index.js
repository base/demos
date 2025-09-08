var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import '../../composites/wui-button/index.js';
import '../../composites/wui-icon-box/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiNoticeCard = class WuiNoticeCard extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.description = '';
        this.icon = 'wallet';
    }
    render() {
        return html `
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `;
    }
};
WuiNoticeCard.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiNoticeCard.prototype, "label", void 0);
__decorate([
    property()
], WuiNoticeCard.prototype, "description", void 0);
__decorate([
    property()
], WuiNoticeCard.prototype, "icon", void 0);
WuiNoticeCard = __decorate([
    customElement('wui-notice-card')
], WuiNoticeCard);
export { WuiNoticeCard };
//# sourceMappingURL=index.js.map