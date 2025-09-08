import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import '../wui-chip/index.js';
export declare class WuiListWalletTransaction extends LitElement {
    static styles: import("lit").CSSResult[];
    amount: string;
    networkCurreny: string;
    networkImageUrl: string;
    receiverAddress: string;
    addressExplorerUrl: string;
    render(): import("lit").TemplateResult<1>;
    private templateNetworkVisual;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-wallet-transaction': WuiListWalletTransaction;
    }
}
