/**
 * Internal
 * This function should be used in place of our existing `getRoundedAmount`
 * It's built on Intl.NumberFormat which is more reliable than our existing method
 * Also allows us to specify the locale in the future if we want to support i18n
 * @param balance - The balance to round
 * @param fractionDigits - The number of fraction digits to round to
 * @returns The rounded balance
 */
export declare function getTruncatedAmount(balance: string, decimalPlaces: number, notation?: 'standard' | 'compact'): string;
//# sourceMappingURL=getTruncatedAmount.d.ts.map