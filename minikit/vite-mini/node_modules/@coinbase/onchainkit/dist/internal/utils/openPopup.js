function openPopup({ url, target, height, width }) {
  const left = Math.round((window.screen.width - width) / 2);
  const top = Math.round((window.screen.height - height) / 2);
  const windowFeatures = `width=${width},height=${height},resizable,scrollbars=yes,status=1,left=${left},top=${top}`;
  return window.open(url, target, windowFeatures);
}
export {
  openPopup
};
//# sourceMappingURL=openPopup.js.map
