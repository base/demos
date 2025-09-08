var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-chip/index.js';
import styles from './styles.js';
let WuiListWalletTransaction = class WuiListWalletTransaction extends LitElement {
    constructor() {
        super(...arguments);
        this.amount = '';
        this.networkCurreny = '';
        this.networkImageUrl = '';
        this.receiverAddress = '';
        this.addressExplorerUrl = '';
    }
    render() {
        return html `
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-200">Sending</wui-text>
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="paragraph-400" color="fg-100">
            ${this.amount} ${this.networkCurreny}
          </wui-text>
          ${this.templateNetworkVisual()}
        </wui-flex>
      </wui-flex>
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-200">To</wui-text>
        <wui-chip
          icon="externalLink"
          variant="shadeSmall"
          href=${this.addressExplorerUrl}
          title=${this.receiverAddress}
        ></wui-chip>
      </wui-flex>
    `;
    }
    templateNetworkVisual() {
        if (this.networkImageUrl) {
            return html `<wui-image src=${this.networkImageUrl} alt="Network Image"></wui-image>`;
        }
        return html `<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
    }
};
WuiListWalletTransaction.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListWalletTransaction.prototype, "amount", void 0);
__decorate([
    property()
], WuiListWalletTransaction.prototype, "networkCurreny", void 0);
__decorate([
    property()
], WuiListWalletTransaction.prototype, "networkImageUrl", void 0);
__decorate([
    property()
], WuiListWalletTransaction.prototype, "receiverAddress", void 0);
__decorate([
    property()
], WuiListWalletTransaction.prototype, "addressExplorerUrl", void 0);
WuiListWalletTransaction = __decorate([
    customElement('wui-list-wallet-transaction')
], WuiListWalletTransaction);
export { WuiListWalletTransaction };
//# sourceMappingURL=index.js.map