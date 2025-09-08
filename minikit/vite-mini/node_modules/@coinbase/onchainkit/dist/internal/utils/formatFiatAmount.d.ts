/**
 * Formats a fiat amount to a string with 2 decimal places.
 * @param amount - The amount to format.
 * @param currency - The currency to format the amount in.
 * @param locale - The locale to format the amount in. Defaults to the browser's locale.
 * @returns The formatted amount.
 */
export declare const formatFiatAmount: ({ amount, currency, locale, minimumFractionDigits, maximumFractionDigits, }: {
    amount: number | string;
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}) => string;
//# sourceMappingURL=formatFiatAmount.d.ts.map