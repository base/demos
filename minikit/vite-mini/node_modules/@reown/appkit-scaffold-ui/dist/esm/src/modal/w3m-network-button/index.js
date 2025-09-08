var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetController, AssetUtil, ChainController, EventsController, ModalController, OptionsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-network-button';
import styles from './styles.js';
class W3mNetworkButtonBase extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.disabled = false;
        this.network = ChainController.state.activeCaipNetwork;
        this.networkImage = AssetUtil.getNetworkImage(this.network);
        this.caipAddress = ChainController.state.activeCaipAddress;
        this.loading = ModalController.state.loading;
        this.isSupported = OptionsController.state.allowUnsupportedChain
            ? true
            : ChainController.state.activeChain
                ? ChainController.checkIfSupportedNetwork(ChainController.state.activeChain)
                : true;
        this.unsubscribe.push(...[
            AssetController.subscribeNetworkImages(() => {
                this.networkImage = AssetUtil.getNetworkImage(this.network);
            }),
            ChainController.subscribeKey('activeCaipAddress', val => {
                this.caipAddress = val;
            }),
            ChainController.subscribeKey('activeCaipNetwork', val => {
                this.network = val;
                this.networkImage = AssetUtil.getNetworkImage(val);
                this.isSupported = val?.chainNamespace
                    ? ChainController.checkIfSupportedNetwork(val.chainNamespace)
                    : true;
                AssetUtil.fetchNetworkImage(val?.assets?.imageId);
            }),
            ModalController.subscribeKey('loading', val => (this.loading = val))
        ]);
    }
    firstUpdated() {
        AssetUtil.fetchNetworkImage(this.network?.assets?.imageId);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const isSupported = this.network
            ? ChainController.checkIfSupportedNetwork(this.network.chainNamespace)
            : true;
        return html `
      <wui-network-button
        .disabled=${Boolean(this.disabled || this.loading)}
        .isUnsupportedChain=${OptionsController.state.allowUnsupportedChain ? false : !isSupported}
        imageSrc=${ifDefined(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `;
    }
    getLabel() {
        if (this.network) {
            if (!this.isSupported && !OptionsController.state.allowUnsupportedChain) {
                return 'Switch Network';
            }
            return this.network.name;
        }
        if (this.label) {
            return this.label;
        }
        if (this.caipAddress) {
            return 'Unknown Network';
        }
        return 'Select Network';
    }
    onClick() {
        if (!this.loading) {
            EventsController.sendEvent({ type: 'track', event: 'CLICK_NETWORKS' });
            ModalController.open({ view: 'Networks' });
        }
    }
}
W3mNetworkButtonBase.styles = styles;
__decorate([
    property({ type: Boolean })
], W3mNetworkButtonBase.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], W3mNetworkButtonBase.prototype, "label", void 0);
__decorate([
    state()
], W3mNetworkButtonBase.prototype, "network", void 0);
__decorate([
    state()
], W3mNetworkButtonBase.prototype, "networkImage", void 0);
__decorate([
    state()
], W3mNetworkButtonBase.prototype, "caipAddress", void 0);
__decorate([
    state()
], W3mNetworkButtonBase.prototype, "loading", void 0);
__decorate([
    state()
], W3mNetworkButtonBase.prototype, "isSupported", void 0);
let W3mNetworkButton = class W3mNetworkButton extends W3mNetworkButtonBase {
};
W3mNetworkButton = __decorate([
    customElement('w3m-network-button')
], W3mNetworkButton);
export { W3mNetworkButton };
let AppKitNetworkButton = class AppKitNetworkButton extends W3mNetworkButtonBase {
};
AppKitNetworkButton = __decorate([
    customElement('appkit-network-button')
], AppKitNetworkButton);
export { AppKitNetworkButton };
//# sourceMappingURL=index.js.map