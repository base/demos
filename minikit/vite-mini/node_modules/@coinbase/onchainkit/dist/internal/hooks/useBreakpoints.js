import { useState, useEffect } from "react";
const BREAKPOINTS = {
  sm: "(max-width: 640px)",
  md: "(min-width: 641px) and (max-width: 768px)",
  lg: "(min-width: 769px) and (max-width: 1023px)",
  xl: "(min-width: 1024px) and (max-width: 1279px)",
  "2xl": "(min-width: 1280px)"
};
function useBreakpoints() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(void 0);
  useEffect(() => {
    const getCurrentBreakpoint = () => {
      const entries = Object.entries(BREAKPOINTS);
      for (const [key, query] of entries) {
        if (window.matchMedia(query).matches) {
          return key;
        }
      }
      return "md";
    };
    setCurrentBreakpoint(getCurrentBreakpoint());
    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return currentBreakpoint;
}
export {
  useBreakpoints
};
//# sourceMappingURL=useBreakpoints.js.map
