import { default as React } from 'react';
type DropdownMenuProps = {
    /** Determines how the menu aligns with the trigger element */
    align?: 'start' | 'center' | 'end';
    /** Content of the dropdown menu */
    children: React.ReactNode;
    isOpen?: boolean;
    /** Space between the trigger and menu in pixels */
    offset?: number;
    /** Callback for when the dropdown should close */
    onClose?: () => void;
    /** The element that triggers the dropdown menu */
    trigger: React.RefObject<HTMLElement>;
    'aria-label'?: string;
};
/**
 * DropdownMenu primitive that handles:
 * - Menu positioning relative to trigger
 * - Focus management
 * - Click outside and escape key dismissal
 * - Keyboard navigation
 * - Proper ARIA attributes for accessibility
 */
export declare function DropdownMenu({ align, children, isOpen, offset, onClose, trigger, 'aria-label': ariaLabel, }: DropdownMenuProps): React.ReactPortal | null;
export {};
//# sourceMappingURL=DropdownMenu.d.ts.map