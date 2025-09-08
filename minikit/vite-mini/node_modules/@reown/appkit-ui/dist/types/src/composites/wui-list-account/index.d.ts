import { LitElement } from 'lit';
import '../../components/wui-image/index.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import '../../composites/wui-icon-box/index.js';
import '../../layout/wui-flex/index.js';
import '../wui-avatar/index.js';
export declare class WuiListAccount extends LitElement {
    static styles: import("lit").CSSResult[];
    accountAddress: string;
    accountType: string;
    private labels;
    private caipNetwork;
    private socialProvider;
    private balance;
    private fetchingBalance;
    private shouldShowIcon;
    selected: boolean;
    onSelect?: ({ address, type }: {
        address: string;
        type: string;
    }, selected: boolean) => void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private getLabel;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-account': WuiListAccount;
    }
}
