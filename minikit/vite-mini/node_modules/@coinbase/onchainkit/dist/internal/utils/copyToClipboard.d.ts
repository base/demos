type CopyToClipboardParams = {
    copyValue: string;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
};
export declare function copyToClipboard({ copyValue, onSuccess, onError, }: CopyToClipboardParams): Promise<void>;
export {};
//# sourceMappingURL=copyToClipboard.d.ts.map