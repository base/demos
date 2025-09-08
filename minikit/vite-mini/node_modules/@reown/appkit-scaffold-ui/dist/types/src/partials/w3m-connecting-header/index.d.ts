import { LitElement } from 'lit';
import type { Platform } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-tabs';
export declare class W3mConnectingHeader extends LitElement {
    private platformTabs;
    private unsubscribe;
    platforms: Platform[];
    onSelectPlatfrom?: (platform: Platform) => void;
    disconnectCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private generateTabs;
    private onTabChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-header': W3mConnectingHeader;
    }
}
