import { LitElement } from 'lit';
import type { TransactionDirection, TransactionImage, TransactionStatus } from '@reown/appkit-common';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { type TransactionType } from '../../utils/TypeUtil.js';
import '../wui-transaction-visual/index.js';
export declare class WuiTransactionListItem extends LitElement {
    static styles: import("lit").CSSResult[];
    type: TransactionType;
    descriptions?: string[];
    date?: string;
    onlyDirectionIcon?: boolean;
    status?: TransactionStatus;
    direction?: TransactionDirection;
    images: TransactionImage[];
    price: TransactionImage[];
    amount: TransactionImage[];
    symbol: TransactionImage[];
    render(): import("lit").TemplateResult<1>;
    private templateDescription;
    private templateSecondDescription;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-transaction-list-item': WuiTransactionListItem;
    }
}
