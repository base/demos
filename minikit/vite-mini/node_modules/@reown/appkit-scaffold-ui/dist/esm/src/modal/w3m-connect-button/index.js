var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ModalController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-connect-button';
class W3mConnectButtonBase extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.size = 'md';
        this.label = 'Connect Wallet';
        this.loadingLabel = 'Connecting...';
        this.open = ModalController.state.open;
        this.loading = this.namespace
            ? ModalController.state.loadingNamespaceMap.get(this.namespace)
            : ModalController.state.loading;
        this.unsubscribe.push(ModalController.subscribe(val => {
            this.open = val.open;
            this.loading = this.namespace ? val.loadingNamespaceMap.get(this.namespace) : val.loading;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-connect-button
        size=${ifDefined(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace ? `-${this.namespace}` : ''}`}
      >
        ${this.loading ? this.loadingLabel : this.label}
      </wui-connect-button>
    `;
    }
    onClick() {
        if (this.open) {
            ModalController.close();
        }
        else if (!this.loading) {
            ModalController.open({ view: 'Connect', namespace: this.namespace });
        }
    }
}
__decorate([
    property()
], W3mConnectButtonBase.prototype, "size", void 0);
__decorate([
    property()
], W3mConnectButtonBase.prototype, "label", void 0);
__decorate([
    property()
], W3mConnectButtonBase.prototype, "loadingLabel", void 0);
__decorate([
    property()
], W3mConnectButtonBase.prototype, "namespace", void 0);
__decorate([
    state()
], W3mConnectButtonBase.prototype, "open", void 0);
__decorate([
    state()
], W3mConnectButtonBase.prototype, "loading", void 0);
let W3mConnectButton = class W3mConnectButton extends W3mConnectButtonBase {
};
W3mConnectButton = __decorate([
    customElement('w3m-connect-button')
], W3mConnectButton);
export { W3mConnectButton };
let AppKitConnectButton = class AppKitConnectButton extends W3mConnectButtonBase {
};
AppKitConnectButton = __decorate([
    customElement('appkit-connect-button')
], AppKitConnectButton);
export { AppKitConnectButton };
//# sourceMappingURL=index.js.map