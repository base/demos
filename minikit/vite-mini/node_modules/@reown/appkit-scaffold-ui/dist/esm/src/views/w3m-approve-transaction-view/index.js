var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { getW3mThemeVariables } from '@reown/appkit-common';
import { ConnectorController, ModalController, ThemeController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import styles from './styles.js';
const PAGE_HEIGHT = 600;
const PAGE_WIDTH = 360;
const HEADER_HEIGHT = 64;
let W3mApproveTransactionView = class W3mApproveTransactionView extends LitElement {
    constructor() {
        super();
        this.bodyObserver = undefined;
        this.unsubscribe = [];
        this.iframe = document.getElementById('w3m-iframe');
        this.ready = false;
        this.unsubscribe.push(...[
            ModalController.subscribeKey('open', isOpen => {
                if (!isOpen) {
                    this.onHideIframe();
                }
            }),
            ModalController.subscribeKey('shake', val => {
                if (val) {
                    this.iframe.style.animation = `w3m-shake 500ms var(--wui-ease-out-power-2)`;
                }
                else {
                    this.iframe.style.animation = 'none';
                }
            })
        ]);
    }
    disconnectedCallback() {
        this.onHideIframe();
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.bodyObserver?.unobserve(window.document.body);
    }
    async firstUpdated() {
        await this.syncTheme();
        this.iframe.style.display = 'block';
        const container = this?.renderRoot?.querySelector('div');
        this.bodyObserver = new ResizeObserver(entries => {
            const contentBoxSize = entries?.[0]?.contentBoxSize;
            const width = contentBoxSize?.[0]?.inlineSize;
            this.iframe.style.height = `${PAGE_HEIGHT}px`;
            container.style.height = `${PAGE_HEIGHT}px`;
            if (width && width <= 430) {
                this.iframe.style.width = '100%';
                this.iframe.style.left = '0px';
                this.iframe.style.bottom = '0px';
                this.iframe.style.top = 'unset';
            }
            else {
                this.iframe.style.width = `${PAGE_WIDTH}px`;
                this.iframe.style.left = `calc(50% - ${PAGE_WIDTH / 2}px)`;
                this.iframe.style.top = `calc(50% - ${PAGE_HEIGHT / 2}px + ${HEADER_HEIGHT / 2}px)`;
                this.iframe.style.bottom = 'unset';
            }
            this.ready = true;
            this.onShowIframe();
        });
        this.bodyObserver.observe(window.document.body);
    }
    render() {
        return html `<div data-ready=${this.ready} id="w3m-frame-container"></div>`;
    }
    onShowIframe() {
        const isMobile = window.innerWidth <= 430;
        this.iframe.style.animation = isMobile
            ? 'w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)'
            : 'w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)';
    }
    onHideIframe() {
        this.iframe.style.display = 'none';
        this.iframe.style.animation = 'w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)';
    }
    async syncTheme() {
        const authConnector = ConnectorController.getAuthConnector();
        if (authConnector) {
            const themeMode = ThemeController.getSnapshot().themeMode;
            const themeVariables = ThemeController.getSnapshot().themeVariables;
            await authConnector.provider.syncTheme({
                themeVariables,
                w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
            });
        }
    }
};
W3mApproveTransactionView.styles = styles;
__decorate([
    state()
], W3mApproveTransactionView.prototype, "ready", void 0);
W3mApproveTransactionView = __decorate([
    customElement('w3m-approve-transaction-view')
], W3mApproveTransactionView);
export { W3mApproveTransactionView };
//# sourceMappingURL=index.js.map