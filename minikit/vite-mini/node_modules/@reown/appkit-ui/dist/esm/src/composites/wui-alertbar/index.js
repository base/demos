var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { AlertController } from '@reown/appkit-controllers';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiAlertBar = class WuiAlertBar extends LitElement {
    constructor() {
        super(...arguments);
        this.message = '';
        this.backgroundColor = 'accent-100';
        this.iconColor = 'accent-100';
        this.icon = 'info';
    }
    render() {
        this.style.cssText = `
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `;
        return html `
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `;
    }
    onClose() {
        AlertController.close();
    }
};
WuiAlertBar.styles = [resetStyles, styles];
__decorate([
    property()
], WuiAlertBar.prototype, "message", void 0);
__decorate([
    property()
], WuiAlertBar.prototype, "backgroundColor", void 0);
__decorate([
    property()
], WuiAlertBar.prototype, "iconColor", void 0);
__decorate([
    property()
], WuiAlertBar.prototype, "icon", void 0);
WuiAlertBar = __decorate([
    customElement('wui-alertbar')
], WuiAlertBar);
export { WuiAlertBar };
//# sourceMappingURL=index.js.map