import { useState, useEffect } from "react";
function usePreferredColorScheme() {
  const [colorScheme, setColorScheme] = useState("light");
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(mediaQuery.matches ? "dark" : "light");
    function updateColorScheme(event) {
      setColorScheme(event.matches ? "dark" : "light");
    }
    mediaQuery.addEventListener("change", updateColorScheme);
    return () => mediaQuery.removeEventListener("change", updateColorScheme);
  }, []);
  return colorScheme;
}
export {
  usePreferredColorScheme
};
//# sourceMappingURL=usePreferredColorScheme.js.map
