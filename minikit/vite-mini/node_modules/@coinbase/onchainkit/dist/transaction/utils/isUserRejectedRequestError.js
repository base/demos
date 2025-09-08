function isUserRejectedRequestError(err) {
  var _a, _b;
  if (((_a = err == null ? void 0 : err.cause) == null ? void 0 : _a.name) === "UserRejectedRequestError") {
    return true;
  }
  if ((_b = err == null ? void 0 : err.shortMessage) == null ? void 0 : _b.includes(
    "User rejected the request."
  )) {
    return true;
  }
  return false;
}
export {
  isUserRejectedRequestError
};
//# sourceMappingURL=isUserRejectedRequestError.js.map
