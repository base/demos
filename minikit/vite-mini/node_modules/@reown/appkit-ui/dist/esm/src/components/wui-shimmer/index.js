var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiShimmer = class WuiShimmer extends LitElement {
    constructor() {
        super(...arguments);
        this.width = '';
        this.height = '';
        this.borderRadius = 'm';
        this.variant = 'default';
    }
    render() {
        this.style.cssText = `
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `;
        return html `<slot></slot>`;
    }
};
WuiShimmer.styles = [styles];
__decorate([
    property()
], WuiShimmer.prototype, "width", void 0);
__decorate([
    property()
], WuiShimmer.prototype, "height", void 0);
__decorate([
    property()
], WuiShimmer.prototype, "borderRadius", void 0);
__decorate([
    property()
], WuiShimmer.prototype, "variant", void 0);
WuiShimmer = __decorate([
    customElement('wui-shimmer')
], WuiShimmer);
export { WuiShimmer };
//# sourceMappingURL=index.js.map