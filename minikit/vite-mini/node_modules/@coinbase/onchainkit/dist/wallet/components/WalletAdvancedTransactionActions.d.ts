type WalletAdvancedTransactionActionProps = {
    icon: React.ReactNode;
    label: string;
    action: () => void;
    classNames?: {
        container?: string;
        icon?: string;
        label?: string;
    };
};
type WalletAdvancedTransactionActionsProps = {
    classNames?: {
        container?: string;
        leftAction?: WalletAdvancedTransactionActionProps['classNames'];
        middleAction?: WalletAdvancedTransactionActionProps['classNames'];
        rightAction?: WalletAdvancedTransactionActionProps['classNames'];
    };
};
export declare function WalletAdvancedTransactionActions({ classNames, }: WalletAdvancedTransactionActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=WalletAdvancedTransactionActions.d.ts.map