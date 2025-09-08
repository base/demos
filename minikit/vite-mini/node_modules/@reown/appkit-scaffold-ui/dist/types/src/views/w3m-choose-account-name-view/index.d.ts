import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
export declare class W3mChooseAccountNameView extends LitElement {
    static styles: import("lit").CSSResult;
    private loading;
    render(): import("lit").TemplateResult<1>;
    private onboardingTemplate;
    private buttonsTemplate;
    private handleContinue;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-choose-account-name-view': W3mChooseAccountNameView;
    }
}
