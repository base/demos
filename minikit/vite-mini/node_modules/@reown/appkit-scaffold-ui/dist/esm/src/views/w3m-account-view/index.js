var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectorController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '../../partials/w3m-account-default-widget/index.js';
import '../../partials/w3m-account-wallet-features-widget/index.js';
let W3mAccountView = class W3mAccountView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.namespace = ChainController.state.activeChain;
        this.unsubscribe.push(ChainController.subscribeKey('activeChain', namespace => {
            this.namespace = namespace;
        }));
    }
    render() {
        if (!this.namespace) {
            return null;
        }
        const connectorId = ConnectorController.getConnectorId(this.namespace);
        const authConnector = ConnectorController.getAuthConnector();
        return html `
      ${authConnector && connectorId === CommonConstantsUtil.CONNECTOR_ID.AUTH
            ? this.walletFeaturesTemplate()
            : this.defaultTemplate()}
    `;
    }
    walletFeaturesTemplate() {
        return html `<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`;
    }
    defaultTemplate() {
        return html `<w3m-account-default-widget></w3m-account-default-widget>`;
    }
};
__decorate([
    state()
], W3mAccountView.prototype, "namespace", void 0);
W3mAccountView = __decorate([
    customElement('w3m-account-view')
], W3mAccountView);
export { W3mAccountView };
//# sourceMappingURL=index.js.map