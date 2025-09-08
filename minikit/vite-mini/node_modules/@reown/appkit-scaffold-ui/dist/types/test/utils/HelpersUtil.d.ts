export declare const HelpersUtil: {
    getTextContent(element: HTMLElement | Element): string;
    querySelect(element: HTMLElement | Element, selector: string): HTMLElement;
    querySelectAll(element: HTMLElement | Element, selector: string): NodeListOf<HTMLElement>;
    getAllByTestId(element: HTMLElement | Element, testId: string): NodeListOf<HTMLElement>;
    getByTestId(element: HTMLElement | Element, testId: string): HTMLElement;
    getClasses(element: HTMLElement | Element, selector?: string): string[];
};
