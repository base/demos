var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ChainController, ConnectionController, CoreHelperUtil, EventsController, ModalController, OptionsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import { W3mEmailOtpWidget } from '../../utils/w3m-email-otp-widget/index.js';
let W3mEmailVerifyOtpView = class W3mEmailVerifyOtpView extends W3mEmailOtpWidget {
    constructor() {
        super(...arguments);
        this.onOtpSubmit = async (otp) => {
            try {
                if (this.authConnector) {
                    await this.authConnector.provider.connectOtp({ otp });
                    EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_PASS' });
                    if (ChainController.state.activeChain) {
                        await ConnectionController.connectExternal(this.authConnector, ChainController.state.activeChain);
                    }
                    else {
                        throw new Error('Active chain is not set on ChainControll');
                    }
                    EventsController.sendEvent({
                        type: 'track',
                        event: 'CONNECT_SUCCESS',
                        properties: { method: 'email', name: this.authConnector.name || 'Unknown' }
                    });
                    if (!OptionsController.state.siwx) {
                        ModalController.close();
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
        this.onOtpResend = async (email) => {
            if (this.authConnector) {
                await this.authConnector.provider.connectEmail({ email });
                EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' });
            }
        };
    }
};
W3mEmailVerifyOtpView = __decorate([
    customElement('w3m-email-verify-otp-view')
], W3mEmailVerifyOtpView);
export { W3mEmailVerifyOtpView };
//# sourceMappingURL=index.js.map