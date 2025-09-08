var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectorController, RouterController, StorageUtil } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-text';
let W3mAccountAuthButton = class W3mAccountAuthButton extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.socialProvider = StorageUtil.getConnectedSocialProvider();
        this.socialUsername = StorageUtil.getConnectedSocialUsername();
        this.namespace = ChainController.state.activeChain;
        this.unsubscribe.push(ChainController.subscribeKey('activeChain', namespace => {
            this.namespace = namespace;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsub => unsub());
    }
    render() {
        const connectorId = ConnectorController.getConnectorId(this.namespace);
        const authConnector = ConnectorController.getAuthConnector();
        if (!authConnector || connectorId !== CommonConstantsUtil.CONNECTOR_ID.AUTH) {
            this.style.cssText = `display: none`;
            return null;
        }
        const email = authConnector.provider.getEmail() ?? '';
        if (!email && !this.socialUsername) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider ?? 'mail'}
        iconSize=${this.socialProvider ? 'xxl' : 'sm'}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${() => {
            this.onGoToUpdateEmail(email, this.socialProvider);
        }}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(email)}</wui-text>
      </wui-list-item>
    `;
    }
    onGoToUpdateEmail(email, socialProvider) {
        if (!socialProvider) {
            RouterController.push('UpdateEmailWallet', { email, redirectView: 'Account' });
        }
    }
    getAuthName(email) {
        if (this.socialUsername) {
            if (this.socialProvider === 'discord' && this.socialUsername.endsWith('0')) {
                return this.socialUsername.slice(0, -1);
            }
            return this.socialUsername;
        }
        return email.length > 30 ? `${email.slice(0, -3)}...` : email;
    }
};
__decorate([
    state()
], W3mAccountAuthButton.prototype, "namespace", void 0);
W3mAccountAuthButton = __decorate([
    customElement('w3m-account-auth-button')
], W3mAccountAuthButton);
export { W3mAccountAuthButton };
//# sourceMappingURL=index.js.map