export type ToastProps = {
    className?: string;
    durationMs?: number;
    startTimeout?: boolean;
    position: 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right';
    animation?: 'animate-enterRight' | 'animate-enterUp' | 'animate-enterDown';
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
};
export declare function Toast({ className, durationMs, startTimeout, position, animation, isVisible, onClose, children, }: ToastProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Toast.d.ts.map