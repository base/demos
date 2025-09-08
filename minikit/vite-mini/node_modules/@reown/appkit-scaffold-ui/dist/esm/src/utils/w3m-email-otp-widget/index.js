var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ConnectorController, CoreHelperUtil, RouterController, SnackController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-otp';
import '@reown/appkit-ui/wui-text';
import { W3mFrameHelpers } from '@reown/appkit-wallet';
import styles from './styles.js';
const OTP_LENGTH = 6;
let W3mEmailOtpWidget = class W3mEmailOtpWidget extends LitElement {
    firstUpdated() {
        this.startOTPTimeout();
    }
    disconnectedCallback() {
        clearTimeout(this.OTPTimeout);
    }
    constructor() {
        super();
        this.loading = false;
        this.timeoutTimeLeft = W3mFrameHelpers.getTimeToNextEmailLogin();
        this.error = '';
        this.otp = '';
        this.email = RouterController.state.data?.email;
        this.authConnector = ConnectorController.getAuthConnector();
    }
    render() {
        if (!this.email) {
            throw new Error('w3m-email-otp-widget: No email provided');
        }
        const isResendDisabled = Boolean(this.timeoutTimeLeft);
        const footerLabels = this.getFooterLabels(isResendDisabled);
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['l', '0', 'l', '0']}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${['0', 'xl', '0', 'xl']}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading
            ? html `<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`
            : html ` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error
                ? html `
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `
                : null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${footerLabels.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${isResendDisabled}>
            ${footerLabels.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `;
    }
    startOTPTimeout() {
        this.timeoutTimeLeft = W3mFrameHelpers.getTimeToNextEmailLogin();
        this.OTPTimeout = setInterval(() => {
            if (this.timeoutTimeLeft > 0) {
                this.timeoutTimeLeft = W3mFrameHelpers.getTimeToNextEmailLogin();
            }
            else {
                clearInterval(this.OTPTimeout);
            }
        }, 1000);
    }
    async onOtpInputChange(event) {
        try {
            if (!this.loading) {
                this.otp = event.detail;
                if (this.authConnector && this.otp.length === OTP_LENGTH) {
                    this.loading = true;
                    await this.onOtpSubmit?.(this.otp);
                }
            }
        }
        catch (error) {
            this.error = CoreHelperUtil.parseError(error);
            this.loading = false;
        }
    }
    async onResendCode() {
        try {
            if (this.onOtpResend) {
                if (!this.loading && !this.timeoutTimeLeft) {
                    this.error = '';
                    this.otp = '';
                    const authConnector = ConnectorController.getAuthConnector();
                    if (!authConnector || !this.email) {
                        throw new Error('w3m-email-otp-widget: Unable to resend email');
                    }
                    this.loading = true;
                    await this.onOtpResend(this.email);
                    this.startOTPTimeout();
                    SnackController.showSuccess('Code email resent');
                }
            }
            else if (this.onStartOver) {
                this.onStartOver();
            }
        }
        catch (error) {
            SnackController.showError(error);
        }
        finally {
            this.loading = false;
        }
    }
    getFooterLabels(isResendDisabled) {
        if (this.onStartOver) {
            return {
                title: 'Something wrong?',
                action: `Try again ${isResendDisabled ? `in ${this.timeoutTimeLeft}s` : ''}`
            };
        }
        return {
            title: `Didn't receive it?`,
            action: `Resend ${isResendDisabled ? `in ${this.timeoutTimeLeft}s` : 'Code'}`
        };
    }
};
W3mEmailOtpWidget.styles = styles;
__decorate([
    state()
], W3mEmailOtpWidget.prototype, "loading", void 0);
__decorate([
    state()
], W3mEmailOtpWidget.prototype, "timeoutTimeLeft", void 0);
__decorate([
    state()
], W3mEmailOtpWidget.prototype, "error", void 0);
W3mEmailOtpWidget = __decorate([
    customElement('w3m-email-otp-widget')
], W3mEmailOtpWidget);
export { W3mEmailOtpWidget };
//# sourceMappingURL=index.js.map