import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import type { SizeType } from '../../utils/TypeUtil.js';
export declare class WuiNetworkImage extends LitElement {
    static styles: import("lit").CSSResult[];
    size: Exclude<SizeType, 'inherit' | 'xxl' | 'xl' | 'xs' | 'mdl' | 'xxs'>;
    name: string;
    networkImagesBySize: {
        sm: import("lit").TemplateResult<2>;
        md: import("lit").TemplateResult<2>;
        lg: import("lit").TemplateResult<2>;
    };
    imageSrc?: string;
    selected?: boolean;
    round?: boolean;
    render(): import("lit").TemplateResult<1>;
    private svgTemplate;
    private templateVisual;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-network-image': WuiNetworkImage;
    }
}
