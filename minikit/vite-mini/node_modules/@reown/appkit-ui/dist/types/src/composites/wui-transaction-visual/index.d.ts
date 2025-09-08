import { LitElement } from 'lit';
import type { TransactionDirection, TransactionImage, TransactionStatus } from '@reown/appkit-common';
import '../../components/wui-image/index.js';
import type { TransactionType } from '../../utils/TypeUtil.js';
import '../wui-icon-box/index.js';
export declare class WuiTransactionVisual extends LitElement {
    static styles: import("lit").CSSResult[];
    type?: TransactionType;
    status?: TransactionStatus;
    direction?: TransactionDirection;
    onlyDirectionIcon?: boolean;
    images: TransactionImage[];
    secondImage: TransactionImage;
    render(): import("lit").TemplateResult<1>;
    private templateVisual;
    private templateIcon;
    private getDirectionIcon;
    private getIcon;
    private getStatusColor;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-transaction-visual': WuiTransactionVisual;
    }
}
