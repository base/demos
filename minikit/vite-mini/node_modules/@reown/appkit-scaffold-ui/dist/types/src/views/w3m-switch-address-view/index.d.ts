import { LitElement } from 'lit';
import { type AccountType } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-avatar';
import '@reown/appkit-ui/wui-banner-img';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-text';
export declare class W3mSwitchAddressView extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly metadata;
    allAccounts: AccountType[];
    private balances;
    readonly labels: Map<string, string>;
    readonly currentAddress: string;
    private caipNetwork;
    constructor();
    connectedCallback(): void;
    getAddressIcon(type: AccountType['type']): "lightbulb" | "mail";
    render(): import("lit").TemplateResult<1>;
    private getAddressTemplate;
    private onSwitchAddress;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-switch-address-view': W3mSwitchAddressView;
    }
}
