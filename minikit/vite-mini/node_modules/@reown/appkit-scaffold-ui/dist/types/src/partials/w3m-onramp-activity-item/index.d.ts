import { LitElement } from 'lit';
import { type ColorType } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-image';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
export declare class W3mOnRampActivityItem extends LitElement {
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    color: ColorType;
    label: string;
    purchaseValue: string;
    purchaseCurrency: string;
    date: string;
    completed: boolean;
    inProgress: boolean;
    failed: boolean;
    onClick: (() => void) | null;
    symbol: string;
    icon?: string;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private fetchTokenImage;
    private statusIconTemplate;
    private errorIconTemplate;
    private imageTemplate;
    private boughtIconTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-onramp-activity-item': W3mOnRampActivityItem;
    }
}
