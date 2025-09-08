var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from '@reown/appkit-ui';
import '../w3m-activity-list/index.js';
import styles from './styles.js';
let W3mAccountActivityWidget = class W3mAccountActivityWidget extends LitElement {
    render() {
        return html `<w3m-activity-list page="account"></w3m-activity-list>`;
    }
};
W3mAccountActivityWidget.styles = styles;
W3mAccountActivityWidget = __decorate([
    customElement('w3m-account-activity-widget')
], W3mAccountActivityWidget);
export { W3mAccountActivityWidget };
//# sourceMappingURL=index.js.map