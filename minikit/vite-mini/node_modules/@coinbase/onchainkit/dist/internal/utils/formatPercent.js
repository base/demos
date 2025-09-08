function formatPercent(value, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}
export {
  formatPercent
};
//# sourceMappingURL=formatPercent.js.map
