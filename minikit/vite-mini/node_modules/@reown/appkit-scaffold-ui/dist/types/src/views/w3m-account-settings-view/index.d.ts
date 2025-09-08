import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-avatar';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-notice-card';
import '@reown/appkit-ui/wui-text';
import '../../partials/w3m-account-auth-button/index.js';
export declare class W3mAccountSettingsView extends LitElement {
    private usubscribe;
    private readonly networkImages;
    private address;
    private profileImage;
    private profileName;
    private network;
    private preferredAccountTypes;
    private disconnecting;
    private loading;
    private switched;
    private text;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private chooseNameButtonTemplate;
    private authCardTemplate;
    private isAllowedNetworkSwitch;
    private onCopyAddress;
    private togglePreferredAccountBtnTemplate;
    private onChooseName;
    private changePreferredAccountType;
    private onNetworks;
    private onDisconnect;
    private onGoToUpgradeView;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-settings-view': W3mAccountSettingsView;
    }
}
