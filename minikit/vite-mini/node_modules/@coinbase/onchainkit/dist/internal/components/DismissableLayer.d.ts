import { default as React } from 'react';
type DismissableLayerProps = {
    children?: React.ReactNode;
    disableEscapeKey?: boolean;
    disableOutsideClick?: boolean;
    onDismiss?: () => void;
    /**
     * Reference to the trigger element (e.g., button) that opens this layer.
     * Prevents the layer from being dismissed when the trigger is clicked, enabling proper toggle behavior.
     */
    triggerRef?: React.RefObject<HTMLElement>;
    /**
     * When `true`, prevents trigger click events from bubbling up.
     * Useful for bottom sheets to prevent unwanted side effects.
     */
    preventTriggerEvents?: boolean;
};
/**
 * DismissableLayer handles dismissal using outside clicks and escape key events
 */
export declare function DismissableLayer({ children, disableEscapeKey, disableOutsideClick, onDismiss, triggerRef, preventTriggerEvents, }: DismissableLayerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DismissableLayer.d.ts.map