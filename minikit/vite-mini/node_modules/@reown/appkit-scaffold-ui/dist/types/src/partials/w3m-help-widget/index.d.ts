import { LitElement } from 'lit';
import type { VisualType } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-visual';
type Data = {
    images: VisualType[];
    title: string;
    text: string;
};
export declare class W3mHelpWidget extends LitElement {
    data: Data[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-help-widget': W3mHelpWidget;
    }
}
export {};
