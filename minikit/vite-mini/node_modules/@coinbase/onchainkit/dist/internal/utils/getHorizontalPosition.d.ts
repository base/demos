type Alignment = 'start' | 'center' | 'end';
type getHorizontalPositionReact = {
    align: Alignment;
    contentRect: DOMRect | undefined;
    triggerRect: DOMRect | undefined;
};
/**
 * Calculates the horizontal position of content relative to a trigger element.
 */
export declare function getHorizontalPosition({ align, contentRect, triggerRect, }: getHorizontalPositionReact): number;
export {};
//# sourceMappingURL=getHorizontalPosition.d.ts.map