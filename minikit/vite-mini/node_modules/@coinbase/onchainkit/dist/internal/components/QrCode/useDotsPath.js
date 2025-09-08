import { useMemo } from "react";
const squareMask = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]
];
const dotMask = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
}
function shouldSkipMaskedCell(i, j, matrixLength) {
  var _a, _b, _c, _d, _e, _f;
  return Boolean(
    ((_a = squareMask[i]) == null ? void 0 : _a[j]) || ((_b = squareMask[i - matrixLength + CORNER_SIZE]) == null ? void 0 : _b[j]) || ((_c = squareMask[i]) == null ? void 0 : _c[j - matrixLength + CORNER_SIZE]) || ((_d = dotMask[i]) == null ? void 0 : _d[j]) || ((_e = dotMask[i - matrixLength + CORNER_SIZE]) == null ? void 0 : _e[j]) || ((_f = dotMask[i]) == null ? void 0 : _f[j - matrixLength + CORNER_SIZE])
  );
}
function shouldSkipLogoArea(i, j, {
  hasLogo,
  logoSize,
  logoMargin,
  logoBorderRadius,
  matrixLength,
  dotSize
}) {
  if (!hasLogo) {
    return false;
  }
  const logoAndMarginTotalSize = logoSize + logoMargin * 2;
  const logoSizeInDots = logoAndMarginTotalSize / dotSize;
  const midpoint = Math.floor(matrixLength / 2);
  const isRoundLogo = logoBorderRadius >= logoSize / 2;
  if (isRoundLogo) {
    const logoRadiusInDots = logoSizeInDots / 2;
    const distFromMiddleInDots = getDistance(j, i, midpoint, midpoint);
    return distFromMiddleInDots - 0.5 <= logoRadiusInDots;
  }
  const numDotsOffCenterToHide = Math.ceil(logoSizeInDots / 2);
  return i <= midpoint + numDotsOffCenterToHide && i >= midpoint - numDotsOffCenterToHide && j <= midpoint + numDotsOffCenterToHide && j >= midpoint - numDotsOffCenterToHide;
}
function getDotPath(centerX, centerY, radius) {
  return `
    M ${centerX - radius} ${centerY}
    A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}
    A ${radius} ${radius} 0 1 1 ${centerX - radius} ${centerY}`;
}
const CORNER_SIZE = 7;
function useDotsPath({
  matrix,
  size,
  logoSize,
  logoMargin,
  logoBorderRadius,
  hasLogo
}) {
  const dotsPath = useMemo(() => {
    const cellSize = size / matrix.length;
    let path = "";
    const matrixLength = matrix.length;
    const dotSize = size / matrixLength;
    matrix.forEach((row, i) => {
      row.forEach((column, j) => {
        if (shouldSkipMaskedCell(i, j, matrixLength) || shouldSkipLogoArea(i, j, {
          hasLogo,
          logoSize,
          logoMargin,
          logoBorderRadius,
          matrixLength,
          dotSize
        })) {
          return;
        }
        if (column) {
          const centerX = cellSize * j + cellSize / 2;
          const centerY = cellSize * i + cellSize / 2;
          path += getDotPath(centerX, centerY, cellSize / 2);
        }
      });
    });
    return path;
  }, [hasLogo, logoBorderRadius, logoMargin, logoSize, matrix, size]);
  return dotsPath;
}
export {
  CORNER_SIZE,
  useDotsPath
};
//# sourceMappingURL=useDotsPath.js.map
