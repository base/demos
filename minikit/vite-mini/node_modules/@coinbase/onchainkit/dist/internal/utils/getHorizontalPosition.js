function getHorizontalPosition({
  align,
  contentRect,
  triggerRect
}) {
  if (!triggerRect || !contentRect) {
    return 0;
  }
  switch (align) {
    case "start":
      return triggerRect.left;
    case "center":
      return triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    case "end":
      return triggerRect.right - contentRect.width;
  }
}
export {
  getHorizontalPosition
};
//# sourceMappingURL=getHorizontalPosition.js.map
