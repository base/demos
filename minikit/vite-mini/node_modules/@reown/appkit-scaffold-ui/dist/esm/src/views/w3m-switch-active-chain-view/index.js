var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectorController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import styles from './styles.js';
const chainIconNameMap = {
    eip155: 'eth',
    solana: 'solana',
    bip122: 'bitcoin',
    polkadot: undefined
};
let W3mSwitchActiveChainView = class W3mSwitchActiveChainView extends LitElement {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
        this.switchToChain = RouterController.state.data?.switchToChain;
        this.caipNetwork = RouterController.state.data?.network;
        this.activeChain = ChainController.state.activeChain;
    }
    firstUpdated() {
        this.unsubscribe.push(ChainController.subscribeKey('activeChain', val => (this.activeChain = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const switchedChainNameString = this.switchToChain
            ? ConstantsUtil.CHAIN_NAME_MAP[this.switchToChain]
            : 'supported';
        if (!this.switchToChain) {
            return null;
        }
        const nextChainName = ConstantsUtil.CHAIN_NAME_MAP[this.switchToChain];
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${ifDefined(chainIconNameMap[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${nextChainName}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${nextChainName}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${switchedChainNameString} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `;
    }
    async switchActiveChain() {
        if (!this.switchToChain) {
            return;
        }
        ChainController.setIsSwitchingNamespace(true);
        ConnectorController.setFilterByNamespace(this.switchToChain);
        if (this.caipNetwork) {
            await ChainController.switchActiveNetwork(this.caipNetwork);
        }
        else {
            ChainController.setActiveNamespace(this.switchToChain);
        }
        RouterController.reset('Connect');
    }
};
W3mSwitchActiveChainView.styles = styles;
__decorate([
    property()
], W3mSwitchActiveChainView.prototype, "activeChain", void 0);
W3mSwitchActiveChainView = __decorate([
    customElement('w3m-switch-active-chain-view')
], W3mSwitchActiveChainView);
export { W3mSwitchActiveChainView };
//# sourceMappingURL=index.js.map