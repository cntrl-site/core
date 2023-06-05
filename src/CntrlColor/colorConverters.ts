export const Converters = 0.0001;

export function rgbToOklch(r: number, g: number, b: number, a: number = 1) {
  let lab = linear_srgb_to_oklab(
    srgbTransferFunctionInv(r / 255),
    srgbTransferFunctionInv(g / 255),
    srgbTransferFunctionInv(b / 255)
  );
  let L = lab[0];
  const H = (0.5 + 0.5 * Math.atan2(-lab[2], -lab[1]) / Math.PI) * 360;
  let C = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
  return { l: L, h: H < 0 ? H + 360 : H, c: clamp(C), a };
}

function srgbTransferFunctionInv(a: number): number {
  return .04045 < a ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92;
}

function srgbTransferFunction(a: number) {
  return .0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, .4166666666666667) - .055;
}

export function clamp(x: number) {
  return x < Converters ? Converters : (x > 1 - Converters ? 1 - Converters : x);
}

export function oklchToRgb(l: number, c: number, h: number, alpha: number = 1) {
  const L = l;
  const C = c;
  const H = (h / 360) * 2 * Math.PI;
  const a = C * Math.cos(H);
  const b1 = C * Math.sin(H);
  const srgb = oklabToLinearSrgb(L, a, b1);
  const r = 255 * srgbTransferFunction(srgb[0]);
  const g = 255 * srgbTransferFunction(srgb[1]);
  const b = 255 * srgbTransferFunction(srgb[2]);
  return { r: r, g: g, b: b, a: alpha };
}

function linear_srgb_to_oklab(r: number, g: number, b: number): [number, number, number] {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  return [
    0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  ];
}

function oklabToLinearSrgb(L: number, a: number, b: number) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return [
    (+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    (-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    (-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)
  ];
}
