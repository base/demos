import { ReactNode } from 'react';
type CopyButtonProps = {
    label: string | ReactNode;
    copyValue: string;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    className?: string;
    'aria-label'?: string;
};
export declare function CopyButton({ label, copyValue, onSuccess, onError, className, 'aria-label': ariaLabel, }: CopyButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CopyButton.d.ts.map