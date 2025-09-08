import QRCode from "qrcode";
import { useMemo } from "react";
function useMatrix(errorCorrectionLevel, value) {
  const matrix = useMemo(() => {
    if (!value) {
      return [];
    }
    const transformedValue = `ethereum:${value}`;
    const arr = Array.from(
      QRCode.create(transformedValue, { errorCorrectionLevel }).modules.data
    );
    const sqrt = Math.sqrt(arr.length);
    return arr.reduce((rows, key, index) => {
      if (index % sqrt === 0) {
        rows.push([key]);
      } else {
        rows[rows.length - 1].push(key);
      }
      return rows;
    }, []);
  }, [errorCorrectionLevel, value]);
  return matrix;
}
export {
  useMatrix
};
//# sourceMappingURL=useMatrix.js.map
