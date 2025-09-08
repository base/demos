var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectorController } from '@reown/appkit-controllers';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-avatar/index.js';
import '../wui-icon-box/index.js';
import styles from './styles.js';
let WuiProfileButtonV2 = class WuiProfileButtonV2 extends LitElement {
    constructor() {
        super(...arguments);
        this.avatarSrc = undefined;
        this.profileName = '';
        this.address = '';
        this.icon = 'mail';
    }
    render() {
        const namespace = ChainController.state.activeChain;
        const connectorId = ConnectorController.getConnectorId(namespace);
        const shouldShowIcon = connectorId === ConstantsUtil.CONNECTOR_ID.AUTH;
        return html `<button data-testid="wui-profile-button" @click=${this.handleClick}>
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${shouldShowIcon ? this.getIconTemplate(this.icon) : ''}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${UiHelperUtil.getTruncateString({
            string: this.profileName || this.address,
            charsStart: this.profileName ? 18 : 4,
            charsEnd: this.profileName ? 0 : 4,
            truncate: this.profileName ? 'end' : 'middle'
        })}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name="copy" id="copy-address"></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`;
    }
    handleClick(event) {
        if (event.target instanceof HTMLElement && event.target.id === 'copy-address') {
            this.onCopyClick?.(event);
            return;
        }
        this.onProfileClick?.(event);
    }
    getIconTemplate(icon) {
        return html `
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="${icon || 'networkPlaceholder'}"
      ></wui-icon-box>
    `;
    }
};
WuiProfileButtonV2.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiProfileButtonV2.prototype, "avatarSrc", void 0);
__decorate([
    property()
], WuiProfileButtonV2.prototype, "profileName", void 0);
__decorate([
    property()
], WuiProfileButtonV2.prototype, "address", void 0);
__decorate([
    property()
], WuiProfileButtonV2.prototype, "icon", void 0);
__decorate([
    property()
], WuiProfileButtonV2.prototype, "onProfileClick", void 0);
__decorate([
    property()
], WuiProfileButtonV2.prototype, "onCopyClick", void 0);
WuiProfileButtonV2 = __decorate([
    customElement('wui-profile-button-v2')
], WuiProfileButtonV2);
export { WuiProfileButtonV2 };
//# sourceMappingURL=index.js.map