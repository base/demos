export declare function getWalletDraggableProps({ draggable, draggableStartingPosition, }: {
    draggable?: boolean;
    draggableStartingPosition?: {
        x: number;
        y: number;
    };
}): {
    draggable: false | undefined;
    draggableStartingPosition?: undefined;
} | {
    draggable: true;
    draggableStartingPosition: {
        x: number;
        y: number;
    };
};
//# sourceMappingURL=getWalletDraggableProps.d.ts.map