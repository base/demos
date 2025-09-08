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
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiCompatibleNetwork = class WuiCompatibleNetwork extends LitElement {
    constructor() {
        super(...arguments);
        this.networkImages = [''];
        this.text = '';
    }
    render() {
        return html `
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `;
    }
    networksTemplate() {
        const slicedNetworks = this.networkImages.slice(0, 5);
        return html ` <wui-flex class="networks">
      ${slicedNetworks?.map(network => html ` <wui-flex class="network-icon"> <wui-image src=${network}></wui-image> </wui-flex>`)}
    </wui-flex>`;
    }
};
WuiCompatibleNetwork.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Array })
], WuiCompatibleNetwork.prototype, "networkImages", void 0);
__decorate([
    property()
], WuiCompatibleNetwork.prototype, "text", void 0);
WuiCompatibleNetwork = __decorate([
    customElement('wui-compatible-network')
], WuiCompatibleNetwork);
export { WuiCompatibleNetwork };
//# sourceMappingURL=index.js.map