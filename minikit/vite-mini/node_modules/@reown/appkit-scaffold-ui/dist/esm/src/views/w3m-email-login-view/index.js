var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ConnectorController, OptionsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import { ConstantsUtil as AppKitConstantsUtil } from '@reown/appkit-utils';
let W3mEmailLoginView = class W3mEmailLoginView extends LitElement {
    constructor() {
        super();
        this.authConnector = ConnectorController.getAuthConnector();
        this.isEmailEnabled = OptionsController.state.remoteFeatures?.email;
        this.isAuthEnabled = this.checkIfAuthEnabled(ConnectorController.state.connectors);
        this.connectors = ConnectorController.state.connectors;
        ConnectorController.subscribeKey('connectors', val => {
            this.connectors = val;
            this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
        });
    }
    render() {
        if (!this.isEmailEnabled) {
            throw new Error('w3m-email-login-view: Email is not enabled');
        }
        if (!this.isAuthEnabled) {
            throw new Error('w3m-email-login-view: No auth connector provided');
        }
        return html `<wui-flex
      flexDirection="column"
      .padding=${['3xs', 'm', 'm', 'm']}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `;
    }
    checkIfAuthEnabled(connectors) {
        const namespacesWithAuthConnector = connectors
            .filter(c => c.type === AppKitConstantsUtil.CONNECTOR_TYPE_AUTH)
            .map(i => i.chain);
        const authSupportedNamespaces = CommonConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS;
        return authSupportedNamespaces.some(ns => namespacesWithAuthConnector.includes(ns));
    }
};
__decorate([
    state()
], W3mEmailLoginView.prototype, "connectors", void 0);
W3mEmailLoginView = __decorate([
    customElement('w3m-email-login-view')
], W3mEmailLoginView);
export { W3mEmailLoginView };
//# sourceMappingURL=index.js.map