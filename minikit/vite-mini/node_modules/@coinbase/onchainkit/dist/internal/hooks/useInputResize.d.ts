import { RefObject } from 'react';
type InputResizeConfig = {
    baseFontSize: number;
    minScale: number;
};
export declare function useInputResize(containerRef: RefObject<HTMLDivElement>, wrapperRef: RefObject<HTMLDivElement>, inputRef: RefObject<HTMLInputElement>, measureRef: RefObject<HTMLSpanElement>, labelRef: RefObject<HTMLSpanElement>, config?: Partial<InputResizeConfig>): () => void;
export {};
//# sourceMappingURL=useInputResize.d.ts.map