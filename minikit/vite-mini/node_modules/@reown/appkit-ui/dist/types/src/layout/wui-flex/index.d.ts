import { LitElement } from 'lit';
import type { FlexAlignItemsType, FlexBasisType, FlexDirectionType, FlexGrowType, FlexJustifyContentType, FlexShrinkType, FlexWrapType, SpacingType } from '../../utils/TypeUtil.js';
export declare class WuiFlex extends LitElement {
    static styles: import("lit").CSSResult[];
    flexDirection?: FlexDirectionType;
    flexWrap?: FlexWrapType;
    flexBasis?: FlexBasisType;
    flexGrow?: FlexGrowType;
    flexShrink?: FlexShrinkType;
    alignItems?: FlexAlignItemsType;
    justifyContent?: FlexJustifyContentType;
    columnGap?: SpacingType;
    rowGap?: SpacingType;
    gap?: SpacingType;
    padding?: SpacingType | SpacingType[];
    margin?: SpacingType | SpacingType[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-flex': WuiFlex;
    }
}
