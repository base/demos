var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ConnectorController, EventsController, RouterController, SnackController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mEmailVerifyDeviceView = class W3mEmailVerifyDeviceView extends LitElement {
    constructor() {
        super();
        this.email = RouterController.state.data?.email;
        this.authConnector = ConnectorController.getAuthConnector();
        this.loading = false;
        this.listenForDeviceApproval();
    }
    render() {
        if (!this.email) {
            throw new Error('w3m-email-verify-device-view: No email provided');
        }
        if (!this.authConnector) {
            throw new Error('w3m-email-verify-device-view: No auth connector provided');
        }
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['xxl', 's', 'xxl', 's']}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
    }
    async listenForDeviceApproval() {
        if (this.authConnector) {
            try {
                await this.authConnector.provider.connectDevice();
                EventsController.sendEvent({ type: 'track', event: 'DEVICE_REGISTERED_FOR_EMAIL' });
                EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' });
                RouterController.replace('EmailVerifyOtp', { email: this.email });
            }
            catch (error) {
                RouterController.goBack();
            }
        }
    }
    async onResendCode() {
        try {
            if (!this.loading) {
                if (!this.authConnector || !this.email) {
                    throw new Error('w3m-email-login-widget: Unable to resend email');
                }
                this.loading = true;
                await this.authConnector.provider.connectEmail({ email: this.email });
                this.listenForDeviceApproval();
                SnackController.showSuccess('Code email resent');
            }
        }
        catch (error) {
            SnackController.showError(error);
        }
        finally {
            this.loading = false;
        }
    }
};
W3mEmailVerifyDeviceView.styles = styles;
__decorate([
    state()
], W3mEmailVerifyDeviceView.prototype, "loading", void 0);
W3mEmailVerifyDeviceView = __decorate([
    customElement('w3m-email-verify-device-view')
], W3mEmailVerifyDeviceView);
export { W3mEmailVerifyDeviceView };
//# sourceMappingURL=index.js.map