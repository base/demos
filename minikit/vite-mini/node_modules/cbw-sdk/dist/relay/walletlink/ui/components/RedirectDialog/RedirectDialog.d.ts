type RedirectDialogProps = {
    title: string;
    buttonText: string;
    darkMode: boolean;
    onButtonClick: () => void;
};
export declare class RedirectDialog {
    private root;
    attach(): void;
    present(props: RedirectDialogProps): void;
    clear(): void;
    private render;
}
export {};
