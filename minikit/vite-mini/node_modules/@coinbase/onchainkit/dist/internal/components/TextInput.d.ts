import { InputHTMLAttributes } from 'react';
type TextInputReact = {
    'aria-label'?: string;
    className: string;
    delayMs?: number;
    disabled?: boolean;
    /** specify 'decimal' to trigger numeric keyboards on mobile devices */
    inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
    onBlur?: () => void;
    onChange: (s: string) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string;
    setValue?: (s: string) => void;
    value: string;
    inputValidator?: (s: string) => boolean;
};
export declare const TextInput: import('react').ForwardRefExoticComponent<TextInputReact & import('react').RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=TextInput.d.ts.map