function formatAmount(num) {
  if (!/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    return num;
  }
  const [coefficient, exponent] = num.toLowerCase().split("e");
  const exp = Number.parseInt(exponent);
  const [intPart, decPart = ""] = coefficient.split(".");
  const fullNumber = intPart + decPart;
  const newPosition = intPart.length + exp;
  if (newPosition <= 0) {
    return `0.${"0".repeat(Math.abs(newPosition))}${fullNumber}`;
  }
  if (newPosition >= fullNumber.length) {
    return fullNumber + "0".repeat(newPosition - fullNumber.length);
  }
  return `${fullNumber.slice(0, newPosition)}.${fullNumber.slice(newPosition)}`;
}
export {
  formatAmount
};
//# sourceMappingURL=formatAmount.js.map
