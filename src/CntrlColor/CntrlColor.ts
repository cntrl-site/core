import { ColorParser } from './expr/color/ColorGrammar';
import { oklchToRgb, rgbToOklch } from './colorConvertors';

interface RgbaColorData {
  type: 'rgba';
  r: number;
  g: number;
  b: number;
  a: number;
}

interface OklchColorData {
  type: 'oklch';
  l: number;
  c: number;
  h: number;
  a: number;
}

type ColorData = RgbaColorData | OklchColorData;

export abstract class CntrlColor {
  public static rgba(r: number, g: number, b: number, a: number = 1): CntrlColor {
    return new RgbaColor(r, g, b, a);
  }

  public static oklch(l: number, c: number, h: number, a: number = 1): CntrlColor {
    return new OklchColor(l, c, h, a);
  }

  public static from(data: ColorData): CntrlColor {
    switch (data.type) {
      case 'rgba': return new RgbaColor(data.r, data.g, data.b, data.a);
      case 'oklch': return new OklchColor(data.l, data.c, data.h, data.a);
    }
  }

  public static parse(source: string): CntrlColor {
    const result = ColorParser()(source, 0);
    const token = result.unwrap();
    switch (token.type) {
      case 'rgba': return new RgbaColor(token.value.r, token.value.g, token.value.b, token.value.a);
      case 'oklch': return new OklchColor(token.value.l, token.value.c, token.value.h, token.value.a);
      default: throw new Error('current color format isn\'t supported');
    }
  }

  public fmt(format: 'rgba' | 'hex' | 'oklch', alpha?: number): string {
    throw new Error('not implemented');
  }

  public toCss(): string {
    throw new Error('not implemented');
  }

  public getRgba(): RgbaColorData {
    throw new Error('not implemented');
  }

  public getOklch(): OklchColorData {
    throw new Error('not implemented');
  }

  public getHex(): string {
    throw new Error('not implemented');
  }

  public getAlpha(): number {
    throw new Error('not implemented');
  }

  public mix(targetColor: CntrlColor, amount: number): CntrlColor {
    throw new Error('not implemented');
  }
}

class RgbaColor extends CntrlColor {
  constructor(
    private red: number,
    private green: number,
    private blue: number,
    private alpha: number
  ) {
    super();
  }

  public fmt(format: 'rgba' | 'hex' | 'oklch' = 'rgba', alpha?: number): string {
    switch (format) {
      case 'hex': return this.getHex();
      case 'oklch': {
        const { l, c, h, a } = this.getOklch();
        return `oklch(${l} ${c} ${h} / ${alpha ?? a})`;
      }
      default: return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha ?? this.alpha})`;
    }
  }

  public getRgba(): RgbaColorData {
    return {
      type: 'rgba',
      r: this.red,
      g: this.green,
      b: this.blue,
      a: this.alpha
    };
  }

  public getHex(): string {
    return '#' + [this.red, this.green, this.blue].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  public getOklch(): OklchColorData {
    const { l, c, h, a } = rgbToOklch(this.red, this.green, this.blue, this.alpha);
    return {
      type: 'oklch',
      l: l,
      c: c,
      h: h,
      a: a
    };
  }

  public toCss(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  public getAlpha(): number {
    return this.alpha;
  }

  public mix(targetColor: CntrlColor, amount: number): CntrlColor {
    const { r: targetR, g: targetG, b: targetB, a: targetA } = targetColor.getRgba();
    const r = getRangeValue(amount, this.red, targetR);
    const g = getRangeValue(amount, this.green, targetG);
    const b = getRangeValue(amount, this.blue, targetB);
    const a = getRangeValue(amount, this.alpha, targetA);
    return CntrlColor.from({ type: 'rgba', r: Math.round(r), g: Math.round(g), b: Math.round(b), a: Math.round(a) });
  }
}

class OklchColor extends CntrlColor {
  constructor(
    private lightness: number,
    private chroma: number,
    private hue: number,
    private alpha: number
  ) {
    super();
  }

  public fmt(format: 'rgba' | 'hex' | 'oklch' = 'oklch', alpha?: number): string {
    switch (format) {
      case 'hex': {
        const { r, g, b } = this.getRgba();
        return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
      }
      case 'rgba': {
        const { r, g, b, a } = this.getRgba();
        return `rgba(${r}, ${g}, ${b}, ${alpha ?? a})`;
      }
      default: return `oklch(${this.lightness} ${this.chroma} ${this.hue} / ${alpha ?? this.alpha})`;
    }
  }

  public toCss(): string {
    if (!CSS.supports('color: oklch(42 0.42 90 / 1)')) {
      const { r, g, b, a } = this.getRgba();
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `oklch(${this.lightness} ${this.chroma} ${this.hue} / ${this.alpha})`;
  }

  public getOklch(): OklchColorData {
    return {
      type: 'oklch',
      l: this.lightness,
      c: this.chroma,
      h: this.hue,
      a: this.alpha
    };
  }

  public getRgba(): RgbaColorData {
    const { r, g, b } = oklchToRgb(this.lightness, this.chroma, this.hue);
    return {
      type: 'rgba',
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      a: this.alpha
    };
  }

  public getHex(): string {
    const { r, g, b } = this.getRgba();
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  public getAlpha(): number {
    return this.alpha;
  }

  public mix(targetColor: CntrlColor, amount: number): CntrlColor {
    const { l: targetL, c: targetC, h: targetH, a: targetA } = targetColor.getOklch();
    const l = getRangeValue(amount, this.lightness, targetL);
    const c = getRangeValue(amount, this.chroma, targetC);
    const h = getRangeValue(amount, this.hue, targetH);
    const a = getRangeValue(amount, this.alpha, targetA);
    return CntrlColor.from({ type: 'oklch', l, c, h, a: Math.round(a) });
  }
}

// consider that amount from 0 to 1
function getRangeValue(amount: number, value: number, targetValue: number): number {
  return targetValue * amount - value * amount + value;
}
