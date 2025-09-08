function toReadableAmount(amount, decimals) {
  if (amount.includes(".")) {
    const [wholePart2, fractionalPart2] = amount.split(".");
    const paddedFractionalPart = fractionalPart2.padEnd(decimals, "0");
    const combinedAmount = wholePart2 + paddedFractionalPart;
    return combinedAmount;
  }
  const bigIntAmount = BigInt(amount);
  const divisor = BigInt(10) ** BigInt(decimals);
  const wholePart = (bigIntAmount / divisor).toString();
  const fractionalPart = (bigIntAmount % divisor).toString().padStart(decimals, "0");
  const trimmedFractionalPart = fractionalPart.replace(/0+$/, "");
  return trimmedFractionalPart ? `${wholePart}.${trimmedFractionalPart}` : wholePart;
}
export {
  toReadableAmount
};
//# sourceMappingURL=toReadableAmount.js.map
