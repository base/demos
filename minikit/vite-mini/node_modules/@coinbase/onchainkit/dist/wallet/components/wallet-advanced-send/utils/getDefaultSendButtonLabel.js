import { parseUnits } from "viem";
function getDefaultSendButtonLabel(cryptoAmount, selectedToken) {
  if (!cryptoAmount) {
    return "Input amount";
  }
  if (!selectedToken) {
    return "Select token";
  }
  if (parseUnits(cryptoAmount, selectedToken.decimals) > selectedToken.cryptoBalance) {
    return "Insufficient balance";
  }
  return "Continue";
}
export {
  getDefaultSendButtonLabel
};
//# sourceMappingURL=getDefaultSendButtonLabel.js.map
