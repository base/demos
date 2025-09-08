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
let WuiGrid = class WuiGrid extends LitElement {
    render() {
        this.style.cssText = `
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
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
WuiGrid.styles = [resetStyles, styles];
__decorate([
    property()
], WuiGrid.prototype, "gridTemplateRows", void 0);
__decorate([
    property()
], WuiGrid.prototype, "gridTemplateColumns", void 0);
__decorate([
    property()
], WuiGrid.prototype, "justifyItems", void 0);
__decorate([
    property()
], WuiGrid.prototype, "alignItems", void 0);
__decorate([
    property()
], WuiGrid.prototype, "justifyContent", void 0);
__decorate([
    property()
], WuiGrid.prototype, "alignContent", void 0);
__decorate([
    property()
], WuiGrid.prototype, "columnGap", void 0);
__decorate([
    property()
], WuiGrid.prototype, "rowGap", void 0);
__decorate([
    property()
], WuiGrid.prototype, "gap", void 0);
__decorate([
    property()
], WuiGrid.prototype, "padding", void 0);
__decorate([
    property()
], WuiGrid.prototype, "margin", void 0);
WuiGrid = __decorate([
    customElement('wui-grid')
], WuiGrid);
export { WuiGrid };
//# sourceMappingURL=index.js.map