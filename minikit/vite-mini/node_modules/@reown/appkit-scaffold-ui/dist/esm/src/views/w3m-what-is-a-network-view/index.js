var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { CoreHelperUtil } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '../../partials/w3m-help-widget/index.js';
const data = [
    {
        images: ['network', 'layers', 'system'],
        title: 'The system’s nuts and bolts',
        text: 'A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services.'
    },
    {
        images: ['noun', 'defiAlt', 'dao'],
        title: 'Designed for different uses',
        text: 'Each network is designed differently, and may therefore suit certain apps and experiences.'
    }
];
let W3mWhatIsANetworkView = class W3mWhatIsANetworkView extends LitElement {
    render() {
        return html `
      <wui-flex
        flexDirection="column"
        .padding=${['xxl', 'xl', 'xl', 'xl']}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${data}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${() => {
            CoreHelperUtil.openHref('https://ethereum.org/en/developers/docs/networks/', '_blank');
        }}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `;
    }
};
W3mWhatIsANetworkView = __decorate([
    customElement('w3m-what-is-a-network-view')
], W3mWhatIsANetworkView);
export { W3mWhatIsANetworkView };
//# sourceMappingURL=index.js.map