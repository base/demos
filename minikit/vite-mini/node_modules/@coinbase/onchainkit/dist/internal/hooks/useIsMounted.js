import { useState, useEffect } from "react";
function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}
export {
  useIsMounted
};
//# sourceMappingURL=useIsMounted.js.map
