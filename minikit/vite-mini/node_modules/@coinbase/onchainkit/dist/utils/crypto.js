const getRandomValues = (size) => {
  const array = new Uint8Array(size);
  crypto.getRandomValues(array);
  return array;
};
const generateUUIDWithInsecureFallback = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = getRandomValues(16);
  return bytes[0].toString(16).padStart(2, "0") + bytes[1].toString(16).padStart(2, "0") + bytes[2].toString(16).padStart(2, "0") + bytes[3].toString(16).padStart(2, "0") + "-" + bytes[4].toString(16).padStart(2, "0") + bytes[5].toString(16).padStart(2, "0") + "-" + (bytes[6] & 15 | 64).toString(16).padStart(2, "0") + // UUID version 4
  bytes[7].toString(16).padStart(2, "0") + "-" + (bytes[8] & 63 | 128).toString(16).padStart(2, "0") + // UUID variant
  bytes[9].toString(16).padStart(2, "0") + "-" + bytes[10].toString(16).padStart(2, "0") + bytes[11].toString(16).padStart(2, "0") + bytes[12].toString(16).padStart(2, "0") + bytes[13].toString(16).padStart(2, "0") + bytes[14].toString(16).padStart(2, "0") + bytes[15].toString(16).padStart(2, "0");
};
export {
  generateUUIDWithInsecureFallback
};
//# sourceMappingURL=crypto.js.map
