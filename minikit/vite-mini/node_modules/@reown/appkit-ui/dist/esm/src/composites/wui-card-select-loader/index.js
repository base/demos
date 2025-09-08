var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { networkSvgMd } from '../../assets/svg/networkMd.js';
import '../../components/wui-shimmer/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiCardSelectLoader = class WuiCardSelectLoader extends LitElement {
    constructor() {
        super(...arguments);
        this.type = 'wallet';
    }
    render() {
        return html `
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `;
    }
    shimmerTemplate() {
        if (this.type === 'network') {
            return html ` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${networkSvgMd}`;
        }
        return html `<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
    }
};
WuiCardSelectLoader.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiCardSelectLoader.prototype, "type", void 0);
WuiCardSelectLoader = __decorate([
    customElement('wui-card-select-loader')
], WuiCardSelectLoader);
export { WuiCardSelectLoader };
//# sourceMappingURL=index.js.map