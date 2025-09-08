import { W3mEmailOtpWidget } from '../../utils/w3m-email-otp-widget/index.js';
import type { OnOtpSubmitFn } from '../../utils/w3m-email-otp-widget/index.js';
export declare class W3mUpdateEmailSecondaryOtpView extends W3mEmailOtpWidget {
    constructor();
    email: string | undefined;
    private redirectView;
    onOtpSubmit: OnOtpSubmitFn;
    onStartOver: () => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-update-email-secondary-otp-view': W3mUpdateEmailSecondaryOtpView;
    }
}
