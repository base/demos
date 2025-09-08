import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-avatar';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-list-account';
import '@reown/appkit-ui/wui-text';
export declare class W3mProfileView extends LitElement {
    static styles: import("lit").CSSResult;
    private usubscribe;
    private address;
    private profileImage;
    private profileName;
    private accounts;
    private loading;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private accountsTemplate;
    private onSwitchAccount;
    private accountTemplate;
    private onCopyAddress;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-profile-view': W3mProfileView;
    }
}
