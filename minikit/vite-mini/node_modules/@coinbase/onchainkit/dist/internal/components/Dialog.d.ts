import { default as React } from 'react';
type DialogProps = {
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    modal?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};
/**
 * Dialog primitive that handles:
 * Portaling to document.body
 * Focus management (trapping focus within dialog)
 * Click outside and escape key dismissal
 * Proper ARIA attributes for accessibility
 */
export declare function Dialog({ children, isOpen, modal, onClose, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, }: DialogProps): React.ReactPortal | null;
export {};
//# sourceMappingURL=Dialog.d.ts.map