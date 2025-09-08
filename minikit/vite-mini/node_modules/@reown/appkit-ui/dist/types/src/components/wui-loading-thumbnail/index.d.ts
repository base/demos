import { LitElement } from 'lit';
export declare class WuiLoadingThumbnail extends LitElement {
    static styles: import("lit").CSSResult[];
    radius: number;
    render(): import("lit").TemplateResult<1>;
    private svgLoaderTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-loading-thumbnail': WuiLoadingThumbnail;
    }
}
