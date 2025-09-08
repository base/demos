var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { SnackController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-snackbar';
import styles from './styles.js';
const presets = {
    loading: undefined,
    success: {
        backgroundColor: 'success-100',
        iconColor: 'success-100',
        icon: 'checkmark'
    },
    error: {
        backgroundColor: 'error-100',
        iconColor: 'error-100',
        icon: 'close'
    }
};
let W3mSnackBar = class W3mSnackBar extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.timeout = undefined;
        this.open = SnackController.state.open;
        this.unsubscribe.push(SnackController.subscribeKey('open', val => {
            this.open = val;
            this.onOpen();
        }));
    }
    disconnectedCallback() {
        clearTimeout(this.timeout);
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const { message, variant, svg } = SnackController.state;
        const preset = presets[variant];
        const { icon, iconColor } = svg ?? preset ?? {};
        return html `
      <wui-snackbar
        message=${message}
        backgroundColor=${preset?.backgroundColor}
        iconColor=${iconColor}
        icon=${icon}
        .loading=${variant === 'loading'}
      ></wui-snackbar>
    `;
    }
    onOpen() {
        clearTimeout(this.timeout);
        if (this.open) {
            this.animate([
                { opacity: 0, transform: 'translateX(-50%) scale(0.85)' },
                { opacity: 1, transform: 'translateX(-50%) scale(1)' }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            if (SnackController.state.autoClose) {
                this.timeout = setTimeout(() => SnackController.hide(), 2500);
            }
        }
        else {
            this.animate([
                { opacity: 1, transform: 'translateX(-50%) scale(1)' },
                { opacity: 0, transform: 'translateX(-50%) scale(0.85)' }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
};
W3mSnackBar.styles = styles;
__decorate([
    state()
], W3mSnackBar.prototype, "open", void 0);
W3mSnackBar = __decorate([
    customElement('w3m-snackbar')
], W3mSnackBar);
export { W3mSnackBar };
//# sourceMappingURL=index.js.map