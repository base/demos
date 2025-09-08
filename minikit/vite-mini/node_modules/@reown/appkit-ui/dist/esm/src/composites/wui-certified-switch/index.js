var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../components/wui-icon/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-switch/index.js';
import styles from './styles.js';
let WuiCertifiedSwitch = class WuiCertifiedSwitch extends LitElement {
    constructor() {
        super(...arguments);
        this.checked = undefined;
    }
    render() {
        return html `
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${ifDefined(this.checked)}></wui-switch>
      </button>
    `;
    }
};
WuiCertifiedSwitch.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Boolean })
], WuiCertifiedSwitch.prototype, "checked", void 0);
WuiCertifiedSwitch = __decorate([
    customElement('wui-certified-switch')
], WuiCertifiedSwitch);
export { WuiCertifiedSwitch };
//# sourceMappingURL=index.js.map