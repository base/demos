var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiLoadingThumbnail = class WuiLoadingThumbnail extends LitElement {
    constructor() {
        super(...arguments);
        this.radius = 36;
    }
    render() {
        return this.svgLoaderTemplate();
    }
    svgLoaderTemplate() {
        const radius = this.radius > 50 ? 50 : this.radius;
        const standardValue = 36;
        const radiusFactor = standardValue - radius;
        const dashArrayStart = 116 + radiusFactor;
        const dashArrayEnd = 245 + radiusFactor;
        const dashOffset = 360 + radiusFactor * 1.75;
        return html `
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${radius}
          stroke-dasharray="${dashArrayStart} ${dashArrayEnd}"
          stroke-dashoffset=${dashOffset}
        />
      </svg>
    `;
    }
};
WuiLoadingThumbnail.styles = [resetStyles, styles];
__decorate([
    property({ type: Number })
], WuiLoadingThumbnail.prototype, "radius", void 0);
WuiLoadingThumbnail = __decorate([
    customElement('wui-loading-thumbnail')
], WuiLoadingThumbnail);
export { WuiLoadingThumbnail };
//# sourceMappingURL=index.js.map