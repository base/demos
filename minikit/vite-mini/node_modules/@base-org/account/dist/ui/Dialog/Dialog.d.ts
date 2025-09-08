import { FunctionComponent } from 'preact';
export type DialogProps = {
    title: string;
    message: string;
    actionItems?: DialogActionItem[];
    onClose?: () => void;
};
export type DialogInstanceProps = Omit<DialogProps, 'onClose'> & {
    handleClose: () => void;
};
export type DialogActionItem = {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
};
export declare class Dialog {
    private readonly items;
    private nextItemKey;
    private root;
    constructor();
    attach(el: Element): void;
    presentItem(itemProps: DialogProps): void;
    clear(): void;
    private render;
}
export declare const DialogContainer: FunctionComponent;
export declare const DialogInstance: FunctionComponent<DialogInstanceProps>;
//# sourceMappingURL=Dialog.d.ts.map