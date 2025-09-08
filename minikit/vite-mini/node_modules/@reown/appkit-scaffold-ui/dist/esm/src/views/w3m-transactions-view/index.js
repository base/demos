var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-activity-list/index.js';
import styles from './styles.js';
let W3mTransactionsView = class W3mTransactionsView extends LitElement {
    render() {
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 'm', 'm', 'm']} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `;
    }
};
W3mTransactionsView.styles = styles;
W3mTransactionsView = __decorate([
    customElement('w3m-transactions-view')
], W3mTransactionsView);
export { W3mTransactionsView };
//# sourceMappingURL=index.js.map