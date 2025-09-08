function getTruncatedAmount(balance, decimalPlaces, notation = "standard") {
  var _a;
  if (balance === "0") {
    return balance;
  }
  const num = Number(balance);
  const hasDecimals = num % 1 !== 0;
  const decimals = ((_a = balance.split(".")[1]) == null ? void 0 : _a.length) || 0;
  const truncated = decimals > decimalPlaces ? Math.trunc(num * 10 ** decimalPlaces) / 10 ** decimalPlaces : num;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: hasDecimals ? Math.min(decimalPlaces, decimals) : 0,
    notation
    // TODO: implement this once we switch build tools and can target es2023
    // roundingMode: 'trunc',
  });
  return formatter.format(truncated);
}
export {
  getTruncatedAmount
};
//# sourceMappingURL=getTruncatedAmount.js.map
