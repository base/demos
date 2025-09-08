import { useRef, useEffect, useCallback } from "react";
const useThrottle = (callback, delay) => {
  const lastCallTime = useRef(0);
  const timeoutRef = useRef();
  const lastArgsRef = useRef();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return useCallback(
    (...args) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime.current;
      if (timeSinceLastCall >= delay) {
        callbackRef.current(...args);
        lastCallTime.current = now;
      } else if (timeoutRef.current) {
        lastArgsRef.current = args;
      } else if (!timeoutRef.current) {
        lastArgsRef.current = args;
        timeoutRef.current = setTimeout(() => {
          if (lastArgsRef.current) {
            callbackRef.current(...lastArgsRef.current);
            lastCallTime.current = Date.now();
          }
          timeoutRef.current = void 0;
        }, delay - timeSinceLastCall);
      }
    },
    [delay]
  );
};
export {
  useThrottle
};
//# sourceMappingURL=useThrottle.js.map
