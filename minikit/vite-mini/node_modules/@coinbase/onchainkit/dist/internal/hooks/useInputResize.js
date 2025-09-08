import { useCallback, useEffect } from "react";
const defaultConfig = {
  baseFontSize: 3.75,
  // 60px = 3.75rem at default browser font size
  minScale: 0.01
};
function useInputResize(containerRef, wrapperRef, inputRef, measureRef, labelRef, config = {}) {
  const { baseFontSize, minScale } = {
    ...defaultConfig,
    ...config
  };
  const updateScale = useCallback(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const input = inputRef.current;
    const measure = measureRef.current;
    const label = labelRef.current;
    if (!container || !wrapper || !input || !measure || !label) {
      return;
    }
    measure.style.fontSize = `${baseFontSize}rem`;
    input.style.fontSize = `${baseFontSize}rem`;
    const contentWidth = measure.clientWidth;
    const availableWidth = container.clientWidth - label.clientWidth;
    input.style.width = `${contentWidth}px`;
    if (contentWidth > availableWidth) {
      const scale = availableWidth / contentWidth;
      const finalScale = Math.max(scale, minScale);
      wrapper.style.transform = `scale(${finalScale})`;
      wrapper.style.transformOrigin = "left center";
    } else {
      wrapper.style.transform = "scale(1)";
    }
  }, [
    baseFontSize,
    minScale,
    containerRef,
    wrapperRef,
    inputRef,
    measureRef,
    labelRef
  ]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, updateScale]);
  return updateScale;
}
export {
  useInputResize
};
//# sourceMappingURL=useInputResize.js.map
