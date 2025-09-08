function checkHashLength(hash, length) {
  return new RegExp(`^0x[a-fA-F0-9]{${length}}$`).test(hash);
}
export {
  checkHashLength
};
//# sourceMappingURL=checkHashLength.js.map
