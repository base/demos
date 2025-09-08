type GetBoundedPositionParams = {
    draggableRef: React.RefObject<HTMLDivElement>;
    position: {
        x: number;
        y: number;
    };
    minGapToEdge?: number;
};
export declare function getBoundedPosition({ draggableRef, position, minGapToEdge, }: GetBoundedPositionParams): {
    x: number;
    y: number;
};
export {};
//# sourceMappingURL=getBoundedPosition.d.ts.map