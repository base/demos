var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiText = class WuiText extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'paragraph-500';
        this.color = 'fg-300';
        this.align = 'left';
        this.lineClamp = undefined;
    }
    render() {
        const classes = {
            [`wui-font-${this.variant}`]: true,
            [`wui-color-${this.color}`]: true,
            [`wui-line-clamp-${this.lineClamp}`]: this.lineClamp ? true : false
        };
        this.style.cssText = `
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `;
        return html `<slot class=${classMap(classes)}></slot>`;
    }
};
WuiText.styles = [resetStyles, styles];
__decorate([
    property()
], WuiText.prototype, "variant", void 0);
__decorate([
    property()
], WuiText.prototype, "color", void 0);
__decorate([
    property()
], WuiText.prototype, "align", void 0);
__decorate([
    property()
], WuiText.prototype, "lineClamp", void 0);
WuiText = __decorate([
    customElement('wui-text')
], WuiText);
export { WuiText };
//# sourceMappingURL=index.js.map