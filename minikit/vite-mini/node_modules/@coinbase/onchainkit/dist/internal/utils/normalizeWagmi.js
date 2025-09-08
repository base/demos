function normalizeStatus(status) {
  if (status === "CONFIRMED") {
    return "success";
  }
  if (status === "PENDING") {
    return "pending";
  }
  return status;
}
function normalizeTransactionId(data) {
  if (typeof data === "string") {
    return data;
  }
  return data.id;
}
export {
  normalizeStatus,
  normalizeTransactionId
};
//# sourceMappingURL=normalizeWagmi.js.map
