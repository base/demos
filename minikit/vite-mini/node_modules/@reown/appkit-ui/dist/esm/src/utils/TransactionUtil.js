import { DateUtil } from '@reown/appkit-common';
import { UiHelperUtil } from './UiHelperUtil.js';
const FLOAT_FIXED_VALUE = 3;
const plusTypes = ['receive', 'deposit', 'borrow', 'claim'];
const minusTypes = ['withdraw', 'repay', 'burn'];
export const TransactionUtil = {
    getTransactionGroupTitle(year, month) {
        const currentYear = DateUtil.getYear();
        const monthName = DateUtil.getMonthNameByIndex(month);
        const isCurrentYear = year === currentYear;
        const groupTitle = isCurrentYear ? monthName : `${monthName} ${year}`;
        return groupTitle;
    },
    getTransactionImages(transfers) {
        const [transfer, secondTransfer] = transfers;
        const isAllNFT = Boolean(transfer) && transfers?.every(item => Boolean(item.nft_info));
        const haveMultipleTransfers = transfers?.length > 1;
        const haveTwoTransfers = transfers?.length === 2;
        if (haveTwoTransfers && !isAllNFT) {
            return [this.getTransactionImage(transfer), this.getTransactionImage(secondTransfer)];
        }
        if (haveMultipleTransfers) {
            return transfers.map(item => this.getTransactionImage(item));
        }
        return [this.getTransactionImage(transfer)];
    },
    getTransactionImage(transfer) {
        return {
            type: TransactionUtil.getTransactionTransferTokenType(transfer),
            url: TransactionUtil.getTransactionImageURL(transfer)
        };
    },
    getTransactionImageURL(transfer) {
        let imageURL = undefined;
        const isNFT = Boolean(transfer?.nft_info);
        const isFungible = Boolean(transfer?.fungible_info);
        if (transfer && isNFT) {
            imageURL = transfer?.nft_info?.content?.preview?.url;
        }
        else if (transfer && isFungible) {
            imageURL = transfer?.fungible_info?.icon?.url;
        }
        return imageURL;
    },
    getTransactionTransferTokenType(transfer) {
        if (transfer?.fungible_info) {
            return 'FUNGIBLE';
        }
        else if (transfer?.nft_info) {
            return 'NFT';
        }
        return undefined;
    },
    getTransactionDescriptions(transaction) {
        const type = transaction?.metadata?.operationType;
        const transfers = transaction?.transfers;
        const haveTransfer = transaction?.transfers?.length > 0;
        const haveMultipleTransfers = transaction?.transfers?.length > 1;
        const isFungible = haveTransfer && transfers?.every(transfer => Boolean(transfer?.fungible_info));
        const [firstTransfer, secondTransfer] = transfers;
        let firstDescription = this.getTransferDescription(firstTransfer);
        let secondDescription = this.getTransferDescription(secondTransfer);
        if (!haveTransfer) {
            const isSendOrReceive = type === 'send' || type === 'receive';
            if (isSendOrReceive && isFungible) {
                firstDescription = UiHelperUtil.getTruncateString({
                    string: transaction?.metadata.sentFrom,
                    charsStart: 4,
                    charsEnd: 6,
                    truncate: 'middle'
                });
                secondDescription = UiHelperUtil.getTruncateString({
                    string: transaction?.metadata.sentTo,
                    charsStart: 4,
                    charsEnd: 6,
                    truncate: 'middle'
                });
                return [firstDescription, secondDescription];
            }
            return [transaction.metadata.status];
        }
        if (haveMultipleTransfers) {
            return transfers.map(item => this.getTransferDescription(item));
        }
        let prefix = '';
        if (plusTypes.includes(type)) {
            prefix = '+';
        }
        else if (minusTypes.includes(type)) {
            prefix = '-';
        }
        firstDescription = prefix.concat(firstDescription);
        return [firstDescription];
    },
    getTransferDescription(transfer) {
        let description = '';
        if (!transfer) {
            return description;
        }
        if (transfer?.nft_info) {
            description = transfer?.nft_info?.name || '-';
        }
        else if (transfer?.fungible_info) {
            description = this.getFungibleTransferDescription(transfer) || '-';
        }
        return description;
    },
    getFungibleTransferDescription(transfer) {
        if (!transfer) {
            return null;
        }
        const quantity = this.getQuantityFixedValue(transfer?.quantity.numeric);
        const description = [quantity, transfer?.fungible_info?.symbol].join(' ').trim();
        return description;
    },
    getQuantityFixedValue(value) {
        if (!value) {
            return null;
        }
        const parsedValue = parseFloat(value);
        return parsedValue.toFixed(FLOAT_FIXED_VALUE);
    }
};
//# sourceMappingURL=TransactionUtil.js.map