import { W3mEmailOtpWidget } from '../../utils/w3m-email-otp-widget/index.js';
import type { OnOtpSubmitFn } from '../../utils/w3m-email-otp-widget/index.js';
export declare class W3mUpdateEmailPrimaryOtpView extends W3mEmailOtpWidget {
    constructor();
    email: string | undefined;
    onOtpSubmit: OnOtpSubmitFn;
    onStartOver: () => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-update-email-primary-otp-view': W3mUpdateEmailPrimaryOtpView;
    }
}
