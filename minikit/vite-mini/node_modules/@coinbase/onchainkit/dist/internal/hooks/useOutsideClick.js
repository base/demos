import { useCallback, useEffect } from "react";
function useOutsideClick(elRef, callback) {
  const handleClickOutside = useCallback(
    (e) => {
      var _a;
      if (!elRef.current) {
        return;
      }
      const isOutsideClick = !elRef.current.contains(e.target);
      const eventPath = (_a = e.composedPath) == null ? void 0 : _a.call(e);
      const hasPortalOrigin = eventPath == null ? void 0 : eventPath.some(
        (el) => el instanceof HTMLElement && el.hasAttribute("data-portal-origin")
      );
      if (!hasPortalOrigin && isOutsideClick) {
        callback();
      }
    },
    [callback, elRef]
  );
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener("click", handleClickOutside, {
        capture: true
      });
    };
  }, [handleClickOutside]);
}
export {
  useOutsideClick
};
//# sourceMappingURL=useOutsideClick.js.map
