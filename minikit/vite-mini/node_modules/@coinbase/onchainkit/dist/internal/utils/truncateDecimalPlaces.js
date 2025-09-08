const truncateDecimalPlaces = (value, decimalPlaces) => {
  const stringValue = String(value);
  const decimalIndex = stringValue.indexOf(".");
  let resultValue = stringValue;
  if (decimalIndex !== -1 && stringValue.length - decimalIndex - 1 > decimalPlaces) {
    resultValue = stringValue.substring(0, decimalIndex + decimalPlaces + 1);
  }
  return resultValue;
};
export {
  truncateDecimalPlaces
};
//# sourceMappingURL=truncateDecimalPlaces.js.map
