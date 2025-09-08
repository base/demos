var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CoreHelperUtil, EventsController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import { W3mEmailOtpWidget } from '../../utils/w3m-email-otp-widget/index.js';
let W3mUpdateEmailSecondaryOtpView = class W3mUpdateEmailSecondaryOtpView extends W3mEmailOtpWidget {
    constructor() {
        super();
        this.email = RouterController.state.data?.newEmail;
        this.redirectView = RouterController.state.data?.redirectView;
        this.onOtpSubmit = async (otp) => {
            try {
                if (this.authConnector) {
                    await this.authConnector.provider.updateEmailSecondaryOtp({ otp });
                    EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_PASS' });
                    if (this.redirectView) {
                        RouterController.reset(this.redirectView);
                    }
                }
            }
            catch (error) {
                EventsController.sendEvent({
                    type: 'track',
                    event: 'EMAIL_VERIFICATION_CODE_FAIL',
                    properties: { message: CoreHelperUtil.parseError(error) }
                });
                throw error;
            }
        };
        this.onStartOver = () => {
            RouterController.replace('UpdateEmailWallet', RouterController.state.data);
        };
    }
};
W3mUpdateEmailSecondaryOtpView = __decorate([
    customElement('w3m-update-email-secondary-otp-view')
], W3mUpdateEmailSecondaryOtpView);
export { W3mUpdateEmailSecondaryOtpView };
//# sourceMappingURL=index.js.map