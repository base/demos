var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-tabs';
let W3mConnectingHeader = class W3mConnectingHeader extends LitElement {
    constructor() {
        super(...arguments);
        this.platformTabs = [];
        this.unsubscribe = [];
        this.platforms = [];
        this.onSelectPlatfrom = undefined;
    }
    disconnectCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const tabs = this.generateTabs();
        return html `
      <wui-flex justifyContent="center" .padding=${['0', '0', 'l', '0']}>
        <wui-tabs .tabs=${tabs} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `;
    }
    generateTabs() {
        const tabs = this.platforms.map(platform => {
            if (platform === 'browser') {
                return { label: 'Browser', icon: 'extension', platform: 'browser' };
            }
            else if (platform === 'mobile') {
                return { label: 'Mobile', icon: 'mobile', platform: 'mobile' };
            }
            else if (platform === 'qrcode') {
                return { label: 'Mobile', icon: 'mobile', platform: 'qrcode' };
            }
            else if (platform === 'web') {
                return { label: 'Webapp', icon: 'browser', platform: 'web' };
            }
            else if (platform === 'desktop') {
                return { label: 'Desktop', icon: 'desktop', platform: 'desktop' };
            }
            return { label: 'Browser', icon: 'extension', platform: 'unsupported' };
        });
        this.platformTabs = tabs.map(({ platform }) => platform);
        return tabs;
    }
    onTabChange(index) {
        const tab = this.platformTabs[index];
        if (tab) {
            this.onSelectPlatfrom?.(tab);
        }
    }
};
__decorate([
    property({ type: Array })
], W3mConnectingHeader.prototype, "platforms", void 0);
__decorate([
    property()
], W3mConnectingHeader.prototype, "onSelectPlatfrom", void 0);
W3mConnectingHeader = __decorate([
    customElement('w3m-connecting-header')
], W3mConnectingHeader);
export { W3mConnectingHeader };
//# sourceMappingURL=index.js.map