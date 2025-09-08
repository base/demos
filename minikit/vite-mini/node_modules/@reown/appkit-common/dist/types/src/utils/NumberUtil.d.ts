import Big from 'big.js';
export declare const NumberUtil: {
    bigNumber(value: Big | string | number | undefined): Big.Big;
    multiply(a: Big | number | string | undefined, b: Big | number | string | undefined): Big.Big;
    formatNumberToLocalString(value: string | number | undefined, decimals?: number): string;
    parseLocalStringToNumber(value: string | undefined): number;
};
