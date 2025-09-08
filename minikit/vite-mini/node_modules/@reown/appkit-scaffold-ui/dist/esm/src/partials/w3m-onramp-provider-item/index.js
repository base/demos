var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, ChainController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-image';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-visual';
import styles from './styles.js';
let W3mOnRampProviderItem = class W3mOnRampProviderItem extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.color = 'inherit';
        this.label = '';
        this.feeRange = '';
        this.loading = false;
        this.onClick = null;
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${ifDefined(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="xxs">
              <wui-icon name="bank" size="xs" color="fg-150"></wui-icon>
              <wui-icon name="card" size="xs" color="fg-150"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading
            ? html `<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`
            : html `<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `;
    }
    networksTemplate() {
        const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
        const slicedNetworks = requestedCaipNetworks
            ?.filter(network => network?.assets?.imageId)
            ?.slice(0, 5);
        return html `
      <wui-flex class="networks">
        ${slicedNetworks?.map(network => html `
            <wui-flex class="network-icon">
              <wui-image src=${ifDefined(AssetUtil.getNetworkImage(network))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `;
    }
};
W3mOnRampProviderItem.styles = [styles];
__decorate([
    property({ type: Boolean })
], W3mOnRampProviderItem.prototype, "disabled", void 0);
__decorate([
    property()
], W3mOnRampProviderItem.prototype, "color", void 0);
__decorate([
    property()
], W3mOnRampProviderItem.prototype, "name", void 0);
__decorate([
    property()
], W3mOnRampProviderItem.prototype, "label", void 0);
__decorate([
    property()
], W3mOnRampProviderItem.prototype, "feeRange", void 0);
__decorate([
    property({ type: Boolean })
], W3mOnRampProviderItem.prototype, "loading", void 0);
__decorate([
    property()
], W3mOnRampProviderItem.prototype, "onClick", void 0);
W3mOnRampProviderItem = __decorate([
    customElement('w3m-onramp-provider-item')
], W3mOnRampProviderItem);
export { W3mOnRampProviderItem };
//# sourceMappingURL=index.js.map