function convertSnakeToCamelCase(obj) {
  if (typeof obj === "string") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => convertSnakeToCamelCase(item));
  }
  if (obj && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = convertSnakeToCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}
function toCamelCase(str) {
  return str.replace(
    /_([a-z])/g,
    (_, letter) => letter.toUpperCase()
  );
}
export {
  convertSnakeToCamelCase
};
//# sourceMappingURL=convertSnakeToCamelCase.js.map
