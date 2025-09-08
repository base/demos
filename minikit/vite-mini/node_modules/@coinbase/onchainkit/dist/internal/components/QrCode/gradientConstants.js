const QR_CODE_SIZE = 237;
const QR_LOGO_SIZE = 50;
const QR_LOGO_RADIUS = 10;
const QR_LOGO_BACKGROUND_COLOR = "#ffffff";
const GRADIENT_START_COORDINATES = { x: 0, y: 0 };
const GRADIENT_END_COORDINATES = { x: 1, y: 0 };
const GRADIENT_END_STYLE = { borderRadius: 32 };
const ockThemeToLinearGradientColorMap = {
  default: "blue",
  base: "baseBlue",
  cyberpunk: "pink",
  hacker: "black"
};
const ockThemeToRadialGradientColorMap = {
  default: "default",
  base: "blue",
  cyberpunk: "magenta",
  hacker: "black"
};
const linearGradientStops = {
  blue: {
    startColor: "#266EFF",
    endColor: "#45E1E5"
  },
  pink: {
    startColor: "#EE5A67",
    endColor: "#CE46BD"
  },
  black: {
    startColor: "#a1a1aa",
    endColor: "#27272a"
  },
  baseBlue: {
    startColor: "#0052ff",
    endColor: "#b2cbff"
  }
};
const presetGradients = {
  default: [
    ["#0F27FF", "39.06%"],
    ["#6100FF", "76.56%"],
    ["#201F1D", "100%"]
  ],
  blue: [
    ["#0F6FFF", "39.06%"],
    ["#0F27FF", "76.56%"],
    ["#201F1D", "100%"]
  ],
  magenta: [
    ["#CF00F1", "36.46%"],
    ["#7900F1", "68.58%"],
    ["#201F1D", "100%"]
  ],
  black: [
    ["#d4d4d8", "36.46%"],
    ["#201F1D", "68.58%"],
    ["#201F1D", "100%"]
  ]
};
export {
  GRADIENT_END_COORDINATES,
  GRADIENT_END_STYLE,
  GRADIENT_START_COORDINATES,
  QR_CODE_SIZE,
  QR_LOGO_BACKGROUND_COLOR,
  QR_LOGO_RADIUS,
  QR_LOGO_SIZE,
  linearGradientStops,
  ockThemeToLinearGradientColorMap,
  ockThemeToRadialGradientColorMap,
  presetGradients
};
//# sourceMappingURL=gradientConstants.js.map
