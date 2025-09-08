var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ApiController, ConnectorController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-connect-announced-widget/index.js';
import '../../partials/w3m-connect-custom-widget/index.js';
import '../../partials/w3m-connect-external-widget/index.js';
import '../../partials/w3m-connect-featured-widget/index.js';
import '../../partials/w3m-connect-injected-widget/index.js';
import '../../partials/w3m-connect-multi-chain-widget/index.js';
import '../../partials/w3m-connect-recent-widget/index.js';
import '../../partials/w3m-connect-recommended-widget/index.js';
import '../../partials/w3m-connect-walletconnect-widget/index.js';
import { ConnectorUtil } from '../../utils/ConnectorUtil.js';
import styles from './styles.js';
let W3mConnectorList = class W3mConnectorList extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController.state.connectors;
        this.recommended = ApiController.state.recommended;
        this.featured = ApiController.state.featured;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)), ApiController.subscribeKey('recommended', val => (this.recommended = val)), ApiController.subscribeKey('featured', val => (this.featured = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `;
    }
    connectorListTemplate() {
        const { custom, recent, announced, injected, multiChain, recommended, featured, external } = ConnectorUtil.getConnectorsByType(this.connectors, this.recommended, this.featured);
        const connectorTypeOrder = ConnectorUtil.getConnectorTypeOrder({
            custom,
            recent,
            announced,
            injected,
            multiChain,
            recommended,
            featured,
            external
        });
        return connectorTypeOrder.map(type => {
            switch (type) {
                case 'injected':
                    return html `
            ${multiChain.length
                        ? html `<w3m-connect-multi-chain-widget
                  tabIdx=${ifDefined(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`
                        : null}
            ${announced.length
                        ? html `<w3m-connect-announced-widget
                  tabIdx=${ifDefined(this.tabIdx)}
                ></w3m-connect-announced-widget>`
                        : null}
            ${injected.length
                        ? html `<w3m-connect-injected-widget
                  .connectors=${injected}
                  tabIdx=${ifDefined(this.tabIdx)}
                ></w3m-connect-injected-widget>`
                        : null}
          `;
                case 'walletConnect':
                    return html `<w3m-connect-walletconnect-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;
                case 'recent':
                    return html `<w3m-connect-recent-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-recent-widget>`;
                case 'featured':
                    return html `<w3m-connect-featured-widget
            .wallets=${featured}
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-featured-widget>`;
                case 'custom':
                    return html `<w3m-connect-custom-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-custom-widget>`;
                case 'external':
                    return html `<w3m-connect-external-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-external-widget>`;
                case 'recommended':
                    return html `<w3m-connect-recommended-widget
            .wallets=${recommended}
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;
                default:
                    console.warn(`Unknown connector type: ${type}`);
                    return null;
            }
        });
    }
};
W3mConnectorList.styles = styles;
__decorate([
    property()
], W3mConnectorList.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mConnectorList.prototype, "connectors", void 0);
__decorate([
    state()
], W3mConnectorList.prototype, "recommended", void 0);
__decorate([
    state()
], W3mConnectorList.prototype, "featured", void 0);
W3mConnectorList = __decorate([
    customElement('w3m-connector-list')
], W3mConnectorList);
export { W3mConnectorList };
//# sourceMappingURL=index.js.map