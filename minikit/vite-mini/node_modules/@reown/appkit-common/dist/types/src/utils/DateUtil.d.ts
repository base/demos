export declare const DateUtil: {
    getMonthNameByIndex(monthIndex: number): string | undefined;
    getYear(date?: string): number;
    getRelativeDateFromNow(date: string | number): string;
    formatDate(date: string | number, format?: string): string;
};
