var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AccountController, ChainController, ConnectionController, ConnectorController, CoreHelperUtil, ModalController, RouterController, SnackController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-avatar';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-list-account';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mProfileView = class W3mProfileView extends LitElement {
    constructor() {
        super();
        this.usubscribe = [];
        this.address = AccountController.state.address;
        this.profileImage = AccountController.state.profileImage;
        this.profileName = AccountController.state.profileName;
        this.accounts = AccountController.state.allAccounts;
        this.loading = false;
        this.usubscribe.push(AccountController.subscribeKey('address', address => {
            if (address) {
                this.address = address;
            }
            else {
                ModalController.close();
            }
        }));
        this.usubscribe.push(AccountController.subscribeKey('profileImage', profileImage => {
            this.profileImage = profileImage;
        }));
        this.usubscribe.push(AccountController.subscribeKey('profileName', profileName => {
            this.profileName = profileName;
        }));
    }
    disconnectedCallback() {
        this.usubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-profile-view: No account provided');
        }
        return html `
      <wui-flex flexDirection="column" gap="l" .padding=${['0', 'xl', 'm', 'xl']}>
        <wui-flex flexDirection="column" alignItems="center" gap="l">
          <wui-avatar
            alt=${this.address}
            address=${this.address}
            imageSrc=${ifDefined(this.profileImage)}
            size="2lg"
          ></wui-avatar>
          <wui-flex flexDirection="column" alignItems="center">
            <wui-flex gap="3xs" alignItems="center" justifyContent="center">
              <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
                ${this.profileName
            ? UiHelperUtil.getTruncateString({
                string: this.profileName,
                charsStart: 20,
                charsEnd: 0,
                truncate: 'end'
            })
            : UiHelperUtil.getTruncateString({
                string: this.address,
                charsStart: 4,
                charsEnd: 6,
                truncate: 'middle'
            })}
              </wui-text>
              <wui-icon-link
                size="md"
                icon="copy"
                iconColor="fg-200"
                @click=${this.onCopyAddress}
              ></wui-icon-link>
            </wui-flex>
          </wui-flex>
        </wui-flex>
        <wui-flex
          data-testid="account-settings-button"
          justifyContent="center"
          alignItems="center"
          class="account-settings-button"
          @click=${() => RouterController.push('AccountSettings')}
        >
          <wui-text variant="paragraph-500" color="fg-100">Account Settings</wui-text>
        </wui-flex>
        ${this.accountsTemplate()}
      </wui-flex>
    `;
    }
    accountsTemplate() {
        return html `<wui-flex flexDirection="column">
      <wui-flex .padding=${['3xs', 'm', 's', 's']}>
        <wui-text color="fg-200" variant="paragraph-400">Your accounts</wui-text>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxs">
        ${this.accounts.map(account => this.accountTemplate(account))}
      </wui-flex>
    </wui-flex>`;
    }
    async onSwitchAccount(account) {
        const namespace = ChainController.state.activeCaipNetwork?.chainNamespace;
        this.loading = true;
        const emailConnector = ConnectorController.getAuthConnector();
        if (emailConnector) {
            const type = account.type;
            await ConnectionController.setPreferredAccountType(type, namespace);
        }
        AccountController.setShouldUpdateToAddress(account.address, namespace);
        this.loading = false;
    }
    accountTemplate(account) {
        return html `<wui-list-account accountAddress=${account.address} accountType=${account.type}>
      ${account.address === this.address
            ? ''
            : html `<wui-button
            slot="action"
            textVariant="small-600"
            size="md"
            variant="accent"
            @click=${() => this.onSwitchAccount(account)}
            .loading=${this.loading}
            >Switch</wui-button
          >`}
    </wui-list-account>`;
    }
    onCopyAddress() {
        try {
            if (this.address) {
                CoreHelperUtil.copyToClopboard(this.address);
                SnackController.showSuccess('Address copied');
            }
        }
        catch {
            SnackController.showError('Failed to copy');
        }
    }
};
W3mProfileView.styles = styles;
__decorate([
    state()
], W3mProfileView.prototype, "address", void 0);
__decorate([
    state()
], W3mProfileView.prototype, "profileImage", void 0);
__decorate([
    state()
], W3mProfileView.prototype, "profileName", void 0);
__decorate([
    state()
], W3mProfileView.prototype, "accounts", void 0);
__decorate([
    state()
], W3mProfileView.prototype, "loading", void 0);
W3mProfileView = __decorate([
    customElement('w3m-profile-view')
], W3mProfileView);
export { W3mProfileView };
//# sourceMappingURL=index.js.map