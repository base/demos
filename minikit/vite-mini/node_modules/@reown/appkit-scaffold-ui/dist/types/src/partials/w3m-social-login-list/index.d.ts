import { LitElement } from 'lit';
import { type SocialProvider } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-social';
export declare class W3mSocialLoginList extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    tabIdx?: number;
    private connectors;
    private authConnector;
    private remoteFeatures;
    private isPwaLoading;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    onSocialClick(socialProvider?: SocialProvider): Promise<void>;
    private handlePwaFrameLoad;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-social-login-list': W3mSocialLoginList;
    }
}
