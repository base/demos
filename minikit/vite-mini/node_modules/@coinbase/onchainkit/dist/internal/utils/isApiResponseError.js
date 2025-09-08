function isApiError(response) {
  return response !== null && typeof response === "object" && "error" in response;
}
export {
  isApiError
};
//# sourceMappingURL=isApiResponseError.js.map
