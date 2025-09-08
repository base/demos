import { useRef, useCallback, useEffect } from "react";
const usePopupMonitor = (onClose) => {
  const intervalRef = useRef(null);
  const startPopupMonitor = useCallback(
    (popupWindow) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = window.setInterval(() => {
        if (popupWindow.closed) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          onClose == null ? void 0 : onClose();
        }
      }, 500);
    },
    [onClose]
  );
  const stopPopupMonitor = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  useEffect(() => {
    return () => stopPopupMonitor();
  }, [stopPopupMonitor]);
  return { startPopupMonitor, stopPopupMonitor };
};
export {
  usePopupMonitor
};
//# sourceMappingURL=usePopupMonitor.js.map
