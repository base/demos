import { fromReadableAmount } from "./fromReadableAmount.js";
import { toReadableAmount } from "./toReadableAmount.js";
function formatDecimals(amount, inputInDecimals = true, decimals = 18) {
  let result;
  if (inputInDecimals) {
    result = toReadableAmount(amount, decimals);
  } else {
    result = fromReadableAmount(amount, decimals);
  }
  return result;
}
export {
  formatDecimals
};
//# sourceMappingURL=formatDecimals.js.map
