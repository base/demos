import { getDefaultDraggableStartingPosition } from "./getDefaultDraggableStartingPosition.js";
function getWalletDraggableProps({
  draggable,
  draggableStartingPosition
}) {
  if (!draggable) {
    return { draggable };
  }
  return {
    draggable,
    draggableStartingPosition: draggableStartingPosition ?? getDefaultDraggableStartingPosition()
  };
}
export {
  getWalletDraggableProps
};
//# sourceMappingURL=getWalletDraggableProps.js.map
