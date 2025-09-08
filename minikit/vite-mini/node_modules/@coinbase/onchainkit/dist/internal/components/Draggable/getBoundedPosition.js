function getBoundedPosition({
  draggableRef,
  position,
  minGapToEdge = 10
}) {
  var _a;
  const rect = (_a = draggableRef.current) == null ? void 0 : _a.getBoundingClientRect();
  if (!rect || typeof window === "undefined") {
    return position;
  }
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const newX = Math.min(
    Math.max(minGapToEdge, position.x),
    viewportWidth - rect.width - minGapToEdge
  );
  const newY = Math.min(
    Math.max(minGapToEdge, position.y),
    viewportHeight - rect.height - minGapToEdge
  );
  return { x: newX, y: newY };
}
export {
  getBoundedPosition
};
//# sourceMappingURL=getBoundedPosition.js.map
