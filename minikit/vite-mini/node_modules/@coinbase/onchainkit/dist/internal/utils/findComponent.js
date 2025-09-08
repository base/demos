import { isValidElement } from "react";
function findComponent(Component) {
  return (child) => {
    const childType = child == null ? void 0 : child.type;
    if (childType && typeof childType === "object" && "_payload" in childType) {
      const serverPayload = childType;
      return serverPayload._payload.value[2] === Component.name;
    }
    return isValidElement(child) && child.type === Component;
  };
}
export {
  findComponent
};
//# sourceMappingURL=findComponent.js.map
