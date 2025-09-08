var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { networkSvgLg } from '../../assets/svg/networkLg.js';
import { networkSvgMd } from '../../assets/svg/networkMd.js';
import { networkSvgSm } from '../../assets/svg/networkSm.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiNetworkImage = class WuiNetworkImage extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.name = 'uknown';
        this.networkImagesBySize = {
            sm: networkSvgSm,
            md: networkSvgMd,
            lg: networkSvgLg
        };
        this.selected = false;
        this.round = false;
    }
    render() {
        if (this.round) {
            this.dataset['round'] = 'true';
            this.style.cssText = `
      --local-width: var(--wui-spacing-3xl);
      --local-height: var(--wui-spacing-3xl);
      --local-icon-size: var(--wui-spacing-l);
    `;
        }
        else {
            this.style.cssText = `

      --local-path: var(--wui-path-network-${this.size});
      --local-width:  var(--wui-width-network-${this.size});
      --local-height:  var(--wui-height-network-${this.size});
      --local-icon-size:  var(--wui-icon-size-network-${this.size});
    `;
        }
        return html `${this.templateVisual()} ${this.svgTemplate()} `;
    }
    svgTemplate() {
        if (this.round) {
            return null;
        }
        return this.networkImagesBySize[this.size];
    }
    templateVisual() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
        }
        return html `<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
    }
};
WuiNetworkImage.styles = [resetStyles, styles];
__decorate([
    property()
], WuiNetworkImage.prototype, "size", void 0);
__decorate([
    property()
], WuiNetworkImage.prototype, "name", void 0);
__decorate([
    property({ type: Object })
], WuiNetworkImage.prototype, "networkImagesBySize", void 0);
__decorate([
    property()
], WuiNetworkImage.prototype, "imageSrc", void 0);
__decorate([
    property({ type: Boolean })
], WuiNetworkImage.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], WuiNetworkImage.prototype, "round", void 0);
WuiNetworkImage = __decorate([
    customElement('wui-network-image')
], WuiNetworkImage);
export { WuiNetworkImage };
//# sourceMappingURL=index.js.map