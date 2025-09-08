function getRoundedAmount(balance, fractionDigits) {
  var _a;
  if (balance === "0") {
    return balance;
  }
  const parsedBalance = Number.parseFloat(balance);
  const result = (_a = Number(parsedBalance)) == null ? void 0 : _a.toFixed(fractionDigits).replace(/0+$/, "");
  if (parsedBalance > 0 && Number.parseFloat(result) === 0) {
    return "0";
  }
  return result;
}
export {
  getRoundedAmount
};
//# sourceMappingURL=getRoundedAmount.js.map
