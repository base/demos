var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { AlertController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-alertbar';
import styles from './styles.js';
export const presets = {
    info: {
        backgroundColor: 'fg-350',
        iconColor: 'fg-325',
        icon: 'info'
    },
    success: {
        backgroundColor: 'success-glass-reown-020',
        iconColor: 'success-125',
        icon: 'checkmark'
    },
    warning: {
        backgroundColor: 'warning-glass-reown-020',
        iconColor: 'warning-100',
        icon: 'warningCircle'
    },
    error: {
        backgroundColor: 'error-glass-reown-020',
        iconColor: 'error-125',
        icon: 'exclamationTriangle'
    }
};
let W3mAlertBar = class W3mAlertBar extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.open = AlertController.state.open;
        this.onOpen(true);
        this.unsubscribe.push(AlertController.subscribeKey('open', val => {
            this.open = val;
            this.onOpen(false);
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const { message, variant } = AlertController.state;
        const preset = presets[variant];
        return html `
      <wui-alertbar
        message=${message}
        backgroundColor=${preset?.backgroundColor}
        iconColor=${preset?.iconColor}
        icon=${preset?.icon}
      ></wui-alertbar>
    `;
    }
    onOpen(isMounted) {
        if (this.open) {
            this.animate([
                { opacity: 0, transform: 'scale(0.85)' },
                { opacity: 1, transform: 'scale(1)' }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
            this.style.cssText = `pointer-events: auto`;
        }
        else if (!isMounted) {
            this.animate([
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0.85)' }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
            this.style.cssText = `pointer-events: none`;
        }
    }
};
W3mAlertBar.styles = styles;
__decorate([
    state()
], W3mAlertBar.prototype, "open", void 0);
W3mAlertBar = __decorate([
    customElement('w3m-alertbar')
], W3mAlertBar);
export { W3mAlertBar };
//# sourceMappingURL=index.js.map