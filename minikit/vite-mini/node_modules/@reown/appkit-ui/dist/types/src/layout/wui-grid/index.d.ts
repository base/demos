import { LitElement } from 'lit';
import type { GridContentType, GridItemsType, SpacingType } from '../../utils/TypeUtil.js';
export declare class WuiGrid extends LitElement {
    static styles: import("lit").CSSResult[];
    gridTemplateRows?: string;
    gridTemplateColumns?: string;
    justifyItems?: GridItemsType;
    alignItems?: GridItemsType;
    justifyContent?: GridContentType;
    alignContent?: GridContentType;
    columnGap?: SpacingType;
    rowGap?: SpacingType;
    gap?: SpacingType;
    padding?: SpacingType | SpacingType[];
    margin?: SpacingType | SpacingType[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-grid': WuiGrid;
    }
}
