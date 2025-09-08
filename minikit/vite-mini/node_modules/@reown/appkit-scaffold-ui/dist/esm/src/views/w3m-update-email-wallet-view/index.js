var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ConnectorController } from '@reown/appkit-controllers';
import { EventsController, RouterController, SnackController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-email-input';
import '@reown/appkit-ui/wui-flex';
import styles from './styles.js';
let W3mUpdateEmailWalletView = class W3mUpdateEmailWalletView extends LitElement {
    constructor() {
        super(...arguments);
        this.formRef = createRef();
        this.initialEmail = RouterController.state.data?.email ?? '';
        this.redirectView = RouterController.state.data?.redirectView;
        this.email = '';
        this.loading = false;
    }
    firstUpdated() {
        this.formRef.value?.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                this.onSubmitEmail(event);
            }
        });
    }
    render() {
        return html `
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${ref(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `;
    }
    onEmailInputChange(event) {
        this.email = event.detail;
    }
    async onSubmitEmail(event) {
        try {
            if (this.loading) {
                return;
            }
            this.loading = true;
            event.preventDefault();
            const authConnector = ConnectorController.getAuthConnector();
            if (!authConnector) {
                throw new Error('w3m-update-email-wallet: Auth connector not found');
            }
            const response = await authConnector.provider.updateEmail({ email: this.email });
            EventsController.sendEvent({ type: 'track', event: 'EMAIL_EDIT' });
            if (response.action === 'VERIFY_SECONDARY_OTP') {
                RouterController.push('UpdateEmailSecondaryOtp', {
                    email: this.initialEmail,
                    newEmail: this.email,
                    redirectView: this.redirectView
                });
            }
            else {
                RouterController.push('UpdateEmailPrimaryOtp', {
                    email: this.initialEmail,
                    newEmail: this.email,
                    redirectView: this.redirectView
                });
            }
        }
        catch (error) {
            SnackController.showError(error);
            this.loading = false;
        }
    }
    buttonsTemplate() {
        const showSubmit = !this.loading && this.email.length > 3 && this.email !== this.initialEmail;
        if (!this.redirectView) {
            return html `
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!showSubmit}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `;
        }
        return html `
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${RouterController.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!showSubmit}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `;
    }
};
W3mUpdateEmailWalletView.styles = styles;
__decorate([
    state()
], W3mUpdateEmailWalletView.prototype, "email", void 0);
__decorate([
    state()
], W3mUpdateEmailWalletView.prototype, "loading", void 0);
W3mUpdateEmailWalletView = __decorate([
    customElement('w3m-update-email-wallet-view')
], W3mUpdateEmailWalletView);
export { W3mUpdateEmailWalletView };
//# sourceMappingURL=index.js.map