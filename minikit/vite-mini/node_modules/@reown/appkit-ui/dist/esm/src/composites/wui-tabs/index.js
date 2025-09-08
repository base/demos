var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiTabs = class WuiTabs extends LitElement {
    constructor() {
        super(...arguments);
        this.tabs = [];
        this.onTabChange = () => null;
        this.buttons = [];
        this.disabled = false;
        this.localTabWidth = '100px';
        this.activeTab = 0;
        this.isDense = false;
    }
    render() {
        this.isDense = this.tabs.length > 3;
        this.style.cssText = `
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `;
        this.dataset['type'] = this.isDense ? 'flex' : 'block';
        return this.tabs.map((tab, index) => {
            const isActive = index === this.activeTab;
            return html `
        <button
          ?disabled=${this.disabled}
          @click=${() => this.onTabClick(index)}
          data-active=${isActive}
          data-testid="tab-${tab.label?.toLowerCase()}"
        >
          ${this.iconTemplate(tab)}
          <wui-text variant="small-600" color="inherit"> ${tab.label} </wui-text>
        </button>
      `;
        });
    }
    firstUpdated() {
        if (this.shadowRoot && this.isDense) {
            this.buttons = [...this.shadowRoot.querySelectorAll('button')];
            setTimeout(() => {
                this.animateTabs(0, true);
            }, 0);
        }
    }
    iconTemplate(tab) {
        if (tab.icon) {
            return html `<wui-icon size="xs" color="inherit" name=${tab.icon}></wui-icon>`;
        }
        return null;
    }
    onTabClick(index) {
        if (this.buttons) {
            this.animateTabs(index, false);
        }
        this.activeTab = index;
        this.onTabChange(index);
    }
    animateTabs(index, initialAnimation) {
        const passiveBtn = this.buttons[this.activeTab];
        const activeBtn = this.buttons[index];
        const passiveBtnText = passiveBtn?.querySelector('wui-text');
        const activeBtnText = activeBtn?.querySelector('wui-text');
        const activeBtnBounds = activeBtn?.getBoundingClientRect();
        const activeBtnTextBounds = activeBtnText?.getBoundingClientRect();
        if (passiveBtn && passiveBtnText && !initialAnimation && index !== this.activeTab) {
            passiveBtnText.animate([{ opacity: 0 }], {
                duration: 50,
                easing: 'ease',
                fill: 'forwards'
            });
            passiveBtn.animate([{ width: `34px` }], {
                duration: 500,
                easing: 'ease',
                fill: 'forwards'
            });
        }
        if (activeBtn && activeBtnBounds && activeBtnTextBounds && activeBtnText) {
            if (index !== this.activeTab || initialAnimation) {
                this.localTabWidth = `${Math.round(activeBtnBounds.width + activeBtnTextBounds.width) + 6}px`;
                activeBtn.animate([{ width: `${activeBtnBounds.width + activeBtnTextBounds.width}px` }], {
                    duration: initialAnimation ? 0 : 500,
                    fill: 'forwards',
                    easing: 'ease'
                });
                activeBtnText.animate([{ opacity: 1 }], {
                    duration: initialAnimation ? 0 : 125,
                    delay: initialAnimation ? 0 : 200,
                    fill: 'forwards',
                    easing: 'ease'
                });
            }
        }
    }
};
WuiTabs.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Array })
], WuiTabs.prototype, "tabs", void 0);
__decorate([
    property()
], WuiTabs.prototype, "onTabChange", void 0);
__decorate([
    property({ type: Array })
], WuiTabs.prototype, "buttons", void 0);
__decorate([
    property({ type: Boolean })
], WuiTabs.prototype, "disabled", void 0);
__decorate([
    property()
], WuiTabs.prototype, "localTabWidth", void 0);
__decorate([
    state()
], WuiTabs.prototype, "activeTab", void 0);
__decorate([
    state()
], WuiTabs.prototype, "isDense", void 0);
WuiTabs = __decorate([
    customElement('wui-tabs')
], WuiTabs);
export { WuiTabs };
//# sourceMappingURL=index.js.map