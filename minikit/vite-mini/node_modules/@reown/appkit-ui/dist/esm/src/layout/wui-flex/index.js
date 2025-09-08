var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiFlex = class WuiFlex extends LitElement {
    render() {
        this.style.cssText = `
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 3)};
    `;
        return html `<slot></slot>`;
    }
};
WuiFlex.styles = [resetStyles, styles];
__decorate([
    property()
], WuiFlex.prototype, "flexDirection", void 0);
__decorate([
    property()
], WuiFlex.prototype, "flexWrap", void 0);
__decorate([
    property()
], WuiFlex.prototype, "flexBasis", void 0);
__decorate([
    property()
], WuiFlex.prototype, "flexGrow", void 0);
__decorate([
    property()
], WuiFlex.prototype, "flexShrink", void 0);
__decorate([
    property()
], WuiFlex.prototype, "alignItems", void 0);
__decorate([
    property()
], WuiFlex.prototype, "justifyContent", void 0);
__decorate([
    property()
], WuiFlex.prototype, "columnGap", void 0);
__decorate([
    property()
], WuiFlex.prototype, "rowGap", void 0);
__decorate([
    property()
], WuiFlex.prototype, "gap", void 0);
__decorate([
    property()
], WuiFlex.prototype, "padding", void 0);
__decorate([
    property()
], WuiFlex.prototype, "margin", void 0);
WuiFlex = __decorate([
    customElement('wui-flex')
], WuiFlex);
export { WuiFlex };
//# sourceMappingURL=index.js.map