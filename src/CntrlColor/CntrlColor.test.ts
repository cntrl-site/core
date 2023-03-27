import { CntrlColor, ColorData, OklchColor, RgbaColor } from './CntrlColor';

describe('CntrlColor', () => {
  it('creates CntrlColor child instance', () => {
    const cntrlColor1 = CntrlColor.rgba(255, 0, 0, 1);
    expect(cntrlColor1).toBeInstanceOf(RgbaColor);
    const cntrlColor2 = CntrlColor.oklch(0.4, 0.2, 200, 1);
    expect(cntrlColor2).toBeInstanceOf(OklchColor);
  });
  test('creates CntrlColor child instance from data', () => {
    const rgbaData: ColorData = { type: 'rgba', r: 255, g: 0, b: 0, a: 1 };
    const rgbaColor = CntrlColor.from(rgbaData);
    expect(rgbaColor).toBeInstanceOf(RgbaColor);
    expect(rgbaColor.getRgba()).toEqual(rgbaData);

    const oklchData: ColorData = { type: 'oklch', l: 50, c: 70, h: 90, a: 1 };
    const oklchColor = CntrlColor.from(oklchData);
    expect(oklchColor).toBeInstanceOf(OklchColor);
    expect(oklchColor.getOklch()).toEqual(oklchData);
  });
  it('parse rgba color string and converts it to oklch and hex format', () => {
    const color = 'rgba(0, 255, 0, 1)';
    const cntrlColor = CntrlColor.parse(color);
    expect(cntrlColor).toBeInstanceOf(CntrlColor);
    expect(cntrlColor.getRgba()).toEqual({ type: 'rgba', r: 0, g: 255, b: 0, a: 1 });
    expect(cntrlColor.fmt('rgba')).toBe(color);
    expect(cntrlColor.fmt('oklch')).toBeDefined();
    expect(cntrlColor.fmt('hex').toLowerCase()).toBe('#00ff00');
    const oklch = cntrlColor.getOklch();
    expect(parseFloat(oklch.l.toFixed(3))).toBeCloseTo(0.866)
    expect(parseFloat(oklch.c.toFixed(3))).toBeCloseTo(0.295)
    expect(parseFloat(oklch.h.toFixed(1))).toBeCloseTo(142.5)
  });
  it('parse oklch color string and converts it to rgba and hex format', () => {
    const color = 'oklch(0.6 0.1 120 / 1)';
    const cntrlColor = CntrlColor.parse(color);
    expect(cntrlColor).toBeInstanceOf(CntrlColor);
    expect(cntrlColor.getOklch()).toEqual({ type: 'oklch', l: 0.6, c: 0.1, h: 120, a: 1 });
    expect(cntrlColor.fmt('oklch')).toBe(color);
    expect(cntrlColor.fmt('rgba')).toBe('rgba(121, 137, 64, 1)');
    expect(cntrlColor.fmt('hex').toLowerCase()).toBe('#798940');
  });
  it('parse hex color string and converts it to rgba and oklch format', () => {
    const color = '#00ff00';
    const cntrlColor = CntrlColor.parse(color);
    expect(cntrlColor).toBeInstanceOf(CntrlColor);
    expect(cntrlColor.getRgba()).toEqual({ type: 'rgba', r: 0, g: 255, b: 0, a: 1 });
    expect(cntrlColor.fmt('hex')).toBe(color);
    expect(cntrlColor.fmt('oklch')).toBeDefined();
    expect(cntrlColor.fmt('rgba')).toBe('rgba(0, 255, 0, 1)');
  });
  it('returns color alpha', () => {
    const cntrlColor1 = CntrlColor.rgba(255, 0, 0, 0.5);
    expect(cntrlColor1.getAlpha()).toBe(0.5);
    const cntrlColor2 = CntrlColor.oklch(0.4, 0.2, 200, 0.1);
    expect(cntrlColor2.getAlpha()).toBe(0.1);
  });
  it('returns css string that is supported', () => {
    window.CSS.supports = jest.fn().mockReturnValue(false);
    const cntrlColor1 = CntrlColor.rgba(255, 0, 0, 0.5);
    expect(cntrlColor1.toCss()).toBe('rgba(255, 0, 0, 0.5)');
    const cntrlColor2 = CntrlColor.oklch(0.3, 0.07, 122, 0.5);
    expect(cntrlColor2.toCss()).toBe('rgba(40, 51, 2, 0.5)');
  });
  it('mix from current color to provided color in range between 0 - 1', () => {
    const currentColor = 'oklch(0.3 0.02 100 / 1)';
    const targetColor = 'oklch(0.1 0.01 40 / 0.5)';
    const currentCntrlColor = CntrlColor.parse(currentColor);
    const targetCntrlColor = CntrlColor.parse(targetColor);
    const result1 = currentCntrlColor.mix(targetCntrlColor, 0);
    const result2 = currentCntrlColor.mix(targetCntrlColor, 0.5);
    const result3 = currentCntrlColor.mix(targetCntrlColor, 1);
    expect(result1.fmt('oklch')).toBe(currentColor);
    expect(result2.fmt('oklch')).toBe('oklch(0.2 0.015 70 / 0.75)');
    expect(result3.fmt('oklch')).toBe(targetColor);
  });
});
