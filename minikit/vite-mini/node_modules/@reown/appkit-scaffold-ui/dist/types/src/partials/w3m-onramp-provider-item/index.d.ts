import { LitElement } from 'lit';
import { type OnRampProvider } from '@reown/appkit-controllers';
import { type ColorType } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-image';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-visual';
export declare class W3mOnRampProviderItem extends LitElement {
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    color: ColorType;
    name?: OnRampProvider['name'];
    label: string;
    feeRange: string;
    loading: boolean;
    onClick: (() => void) | null;
    render(): import("lit").TemplateResult<1>;
    private networksTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-onramp-provider-item': W3mOnRampProviderItem;
    }
}
