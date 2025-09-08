import { default as React } from 'react';
type Position = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'center' | 'end';
type PopoverProps = {
    /** Determines how the popover aligns with the anchor */
    align?: Alignment;
    /** The element that the popover will be positioned relative to. */
    anchor: HTMLElement | null;
    children?: React.ReactNode;
    onClose?: () => void;
    /** Spacing (in pixels) between the anchor element and the popover content. */
    offset?: number;
    /** Determines which side of the anchor element the popover will appear. */
    position?: Position;
    isOpen?: boolean;
    /** Reference to the element that triggered the popover (e.g., a button that opened it). */
    trigger?: React.RefObject<HTMLElement>;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};
/** Popover primitive that handles:
 * - Positioning relative to anchor element
 * - Focus management
 * - Click outside and escape key dismissal
 * - Portal rendering
 * - Proper ARIA attributes */
export declare function Popover({ children, anchor, isOpen, onClose, position, align, offset, trigger, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, }: PopoverProps): React.ReactPortal | null;
export {};
//# sourceMappingURL=Popover.d.ts.map