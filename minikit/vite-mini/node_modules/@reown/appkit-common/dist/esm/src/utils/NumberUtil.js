import Big from 'big.js';
export const NumberUtil = {
    bigNumber(value) {
        if (!value) {
            return new Big(0);
        }
        return new Big(value);
    },
    multiply(a, b) {
        if (a === undefined || b === undefined) {
            return new Big(0);
        }
        const aBigNumber = new Big(a);
        const bBigNumber = new Big(b);
        return aBigNumber.times(bBigNumber);
    },
    formatNumberToLocalString(value, decimals = 2) {
        if (value === undefined) {
            return '0.00';
        }
        if (typeof value === 'number') {
            return value.toLocaleString('en-US', {
                maximumFractionDigits: decimals,
                minimumFractionDigits: decimals
            });
        }
        return parseFloat(value).toLocaleString('en-US', {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals
        });
    },
    parseLocalStringToNumber(value) {
        if (value === undefined) {
            return 0;
        }
        return parseFloat(value.replace(/,/gu, ''));
    }
};
//# sourceMappingURL=NumberUtil.js.map