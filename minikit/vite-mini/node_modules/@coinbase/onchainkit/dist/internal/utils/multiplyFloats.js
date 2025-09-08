function multiplyFloats(...numbers) {
  if (numbers.length === 1) {
    return numbers[0];
  }
  const { result, decimalPlaces } = numbers.reduce(
    (acc, num) => {
      const str = num.toString();
      const currentDecimalPlaces = (str.split(".")[1] || "").length;
      const integer = Number(str.replace(".", ""));
      return {
        result: acc.result * integer,
        decimalPlaces: acc.decimalPlaces + currentDecimalPlaces
      };
    },
    { result: 1, decimalPlaces: 0 }
  );
  return result / 10 ** decimalPlaces;
}
export {
  multiplyFloats
};
//# sourceMappingURL=multiplyFloats.js.map
