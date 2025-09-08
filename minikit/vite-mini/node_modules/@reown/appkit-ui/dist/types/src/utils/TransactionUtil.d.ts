import type { Transaction, TransactionImage, TransactionTransfer } from '@reown/appkit-common';
export declare const TransactionUtil: {
    getTransactionGroupTitle(year: number, month: number): string | undefined;
    getTransactionImages(transfers: TransactionTransfer[]): TransactionImage[];
    getTransactionImage(transfer?: TransactionTransfer): TransactionImage;
    getTransactionImageURL(transfer: TransactionTransfer | undefined): string | undefined;
    getTransactionTransferTokenType(transfer?: TransactionTransfer): "FUNGIBLE" | "NFT" | undefined;
    getTransactionDescriptions(transaction: Transaction): string[];
    getTransferDescription(transfer?: TransactionTransfer): string;
    getFungibleTransferDescription(transfer?: TransactionTransfer): string | null;
    getQuantityFixedValue(value: string | undefined): string | null;
};
