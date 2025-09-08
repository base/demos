const isEns = (username) => {
  if (username.endsWith(".base.eth") || username.endsWith(".basetest.eth")) {
    return false;
  }
  if (username.endsWith(".eth") || username.endsWith(".test.eth")) {
    return true;
  }
  return false;
};
export {
  isEns
};
//# sourceMappingURL=isEns.js.map
