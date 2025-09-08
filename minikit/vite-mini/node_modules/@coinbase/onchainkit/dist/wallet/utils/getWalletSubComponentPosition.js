import { WALLET_ADVANCED_MAX_WIDTH, WALLET_ADVANCED_MAX_HEIGHT } from "../constants.js";
function calculateSubComponentPosition(connectRect) {
  if (typeof window === "undefined") {
    return {
      showAbove: false,
      alignRight: false
    };
  }
  const spaceAvailableBelow = window.innerHeight - connectRect.bottom;
  const spaceAvailableRight = window.innerWidth - connectRect.left;
  return {
    showAbove: spaceAvailableBelow < WALLET_ADVANCED_MAX_HEIGHT,
    alignRight: spaceAvailableRight < WALLET_ADVANCED_MAX_WIDTH
  };
}
export {
  calculateSubComponentPosition
};
//# sourceMappingURL=getWalletSubComponentPosition.js.map
