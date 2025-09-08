var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectionController, ConnectorController, CoreHelperUtil } from '@reown/appkit-controllers';
import { EventsController, RouterController, SnackController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-email-input';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mEmailLoginWidget = class W3mEmailLoginWidget extends LitElement {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
        this.formRef = createRef();
        this.email = '';
        this.loading = false;
        this.error = '';
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
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
      <form ${ref(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${ifDefined(this.tabIdx)}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `;
    }
    submitButtonTemplate() {
        const showSubmit = !this.loading && this.email.length > 3;
        return showSubmit
            ? html `
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `
            : null;
    }
    loadingTemplate() {
        return this.loading
            ? html `<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`
            : null;
    }
    templateError() {
        if (this.error) {
            return html `<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`;
        }
        return null;
    }
    onEmailInputChange(event) {
        this.email = event.detail.trim();
        this.error = '';
    }
    async onSubmitEmail(event) {
        const isAvailableChain = ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(chain => chain === ChainController.state.activeChain);
        if (!isAvailableChain) {
            const caipNetwork = ChainController.getFirstCaipNetworkSupportsAuthConnector();
            if (caipNetwork) {
                RouterController.push('SwitchNetwork', { network: caipNetwork });
                return;
            }
        }
        try {
            if (this.loading) {
                return;
            }
            this.loading = true;
            event.preventDefault();
            const authConnector = ConnectorController.getAuthConnector();
            if (!authConnector) {
                throw new Error('w3m-email-login-widget: Auth connector not found');
            }
            const { action } = await authConnector.provider.connectEmail({ email: this.email });
            EventsController.sendEvent({ type: 'track', event: 'EMAIL_SUBMITTED' });
            if (action === 'VERIFY_OTP') {
                EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' });
                RouterController.push('EmailVerifyOtp', { email: this.email });
            }
            else if (action === 'VERIFY_DEVICE') {
                RouterController.push('EmailVerifyDevice', { email: this.email });
            }
            else if (action === 'CONNECT') {
                await ConnectionController.connectExternal(authConnector, ChainController.state.activeChain);
                RouterController.replace('Account');
            }
        }
        catch (error) {
            const parsedError = CoreHelperUtil.parseError(error);
            if (parsedError?.includes('Invalid email')) {
                this.error = 'Invalid email. Try again.';
            }
            else {
                SnackController.showError(error);
            }
        }
        finally {
            this.loading = false;
        }
    }
    onFocusEvent() {
        EventsController.sendEvent({ type: 'track', event: 'EMAIL_LOGIN_SELECTED' });
    }
};
W3mEmailLoginWidget.styles = styles;
__decorate([
    property()
], W3mEmailLoginWidget.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mEmailLoginWidget.prototype, "email", void 0);
__decorate([
    state()
], W3mEmailLoginWidget.prototype, "loading", void 0);
__decorate([
    state()
], W3mEmailLoginWidget.prototype, "error", void 0);
W3mEmailLoginWidget = __decorate([
    customElement('w3m-email-login-widget')
], W3mEmailLoginWidget);
export { W3mEmailLoginWidget };
//# sourceMappingURL=index.js.map