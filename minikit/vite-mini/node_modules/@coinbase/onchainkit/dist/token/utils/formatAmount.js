function formatAmount(amount, options = {}) {
  if (amount === void 0) {
    return "";
  }
  const { locale, minimumFractionDigits, maximumFractionDigits } = options;
  return Number(amount).toLocaleString(locale, {
    minimumFractionDigits,
    maximumFractionDigits
  });
}
export {
  formatAmount
};
//# sourceMappingURL=formatAmount.js.map
