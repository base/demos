var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../layout/wui-flex/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-icon-box/index.js';
import '../wui-wallet-image/index.js';
import styles from './styles.js';
const TOTAL_IMAGES = 4;
let WuiAllWalletsImage = class WuiAllWalletsImage extends LitElement {
    constructor() {
        super(...arguments);
        this.walletImages = [];
    }
    render() {
        const isPlaceholders = this.walletImages.length < TOTAL_IMAGES;
        return html `${this.walletImages
            .slice(0, TOTAL_IMAGES)
            .map(({ src, walletName }) => html `
            <wui-wallet-image
              size="inherit"
              imageSrc=${src}
              name=${ifDefined(walletName)}
            ></wui-wallet-image>
          `)}
      ${isPlaceholders
            ? [...Array(TOTAL_IMAGES - this.walletImages.length)].map(() => html ` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`)
            : null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`;
    }
};
WuiAllWalletsImage.styles = [resetStyles, styles];
__decorate([
    property({ type: Array })
], WuiAllWalletsImage.prototype, "walletImages", void 0);
WuiAllWalletsImage = __decorate([
    customElement('wui-all-wallets-image')
], WuiAllWalletsImage);
export { WuiAllWalletsImage };
//# sourceMappingURL=index.js.map