type BottomSheetProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    triggerRef?: React.RefObject<HTMLElement>;
    className?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};
export declare function BottomSheet({ children, className, isOpen, onClose, triggerRef, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, }: BottomSheetProps): import('react').ReactPortal | null;
export {};
//# sourceMappingURL=BottomSheet.d.ts.map