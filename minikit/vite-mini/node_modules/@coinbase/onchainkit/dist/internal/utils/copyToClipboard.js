'use client';
async function copyToClipboard({
  copyValue,
  onSuccess,
  onError
}) {
  try {
    await navigator.clipboard.writeText(copyValue);
    onSuccess == null ? void 0 : onSuccess();
  } catch (err) {
    onError == null ? void 0 : onError(err);
  }
}
export {
  copyToClipboard
};
//# sourceMappingURL=copyToClipboard.js.map
