import { Alt, Opt, Regex, Seq, Text } from '../Combs';
import { Parser } from '../Parser';
import { Token } from '../Token';
import { Angle, CssNumber, Percentage } from './ColorCommons';

interface RgbaTokenValue {
  r: number;
  g: number;
  b: number;
  a: number;
}
type RgbaToken = Token<'rgba', RgbaTokenValue>;

function RgbComma(): Parser<RgbaToken> {
  const parseNum = CssNumber();
  const parseComma = Regex(/\s*,\s*/);
  const parseRgb = Seq([
    Text('rgb', true),
    Regex(/\(\s*/),
    parseNum,
    parseComma,
    parseNum,
    parseComma,
    parseNum,
    Regex(/\s*\)/)
  ]);
  const parseRgba = Seq([
    Text('rgba', true),
    Regex(/\(\s*/),
    parseNum,
    parseComma,
    parseNum,
    parseComma,
    parseNum,
    parseComma,
    parseNum,
    Regex(/\s*\)/)
  ]);
  const parse = Alt(parseRgb, parseRgba);
  const parseRgbaComma: Parser<RgbaToken> = (src, index) => parse(src, index).map(t => t.produce({
    type: 'rgba',
    value: {
      r: t.value[2].value,
      g: t.value[4].value,
      b: t.value[6].value,
      a: t.value[8]?.value ?? 1
    }
  }));
  return parseRgbaComma;
}

function Hex(): Parser<RgbaToken> {
  const parse = Regex(/#(?:([0-9a-f]{8})|([0-9a-f]{6})|([0-9a-f]{3}))(?=\b|$)/i);
  const parseHex: Parser<RgbaToken> = (src, index) => parse(src, index).map(t => {
    const [, wAlpha, long, short] = t.value;
    let red = 0, green = 0, blue = 0, alpha = 1;
    if (wAlpha) {
      red = parseInt(wAlpha.slice(0, 2), 16);
      green = parseInt(wAlpha.slice(2, 4), 16);
      blue = parseInt(wAlpha.slice(4, 6), 16);
      alpha = parseInt(wAlpha.slice(6, 8), 16) / 0xff;
    }
    if (long) {
      red = parseInt(long.slice(0, 2), 16);
      green = parseInt(long.slice(2, 4), 16);
      blue = parseInt(long.slice(4, 6), 16);
    }
    if (short) {
      red = parseInt(short.charAt(0), 16);
      red = (red << 4) ^ red;
      green = parseInt(short.charAt(1), 16);
      green = (green << 4) ^ green;
      blue = parseInt(short.charAt(2), 16);
      blue = (blue << 4) ^ blue;
    }
    return t.produce({
      type: 'rgba',
      value: {
        r: red,
        g: green,
        b: blue,
        a: alpha
      }
    });
  });
  return parseHex;
}

function RgbSpace(): Parser<RgbaToken> {
  const parseNum = CssNumber();
  const parseWhitespace = Regex(/\s+/);
  const parseRgb = Seq([
    Text('rgb', true),
    Regex(/\(\s*/),
    parseNum,
    parseWhitespace,
    parseNum,
    parseWhitespace,
    parseNum,
    Regex(/\s*\)/)
  ]);
  const parseRgba = Seq([
    Text('rgba', true),
    Regex(/\(\s*/),
    parseNum,
    parseWhitespace,
    parseNum,
    parseWhitespace,
    parseNum,
    Regex(/\s*\/\s*/),
    parseNum,
    Regex(/\s*\)/)
  ]);
  const parse = Alt(parseRgb, parseRgba);
  const parseRgbaSpace: Parser<RgbaToken> = (src, index) => parse(src, index).map(t => t.produce({
    type: 'rgba',
    value: {
      r: t.value[2].value,
      g: t.value[4].value,
      b: t.value[6].value,
      a: t.value[8]?.value ?? 1
    }
  }));
  return parseRgbaSpace;
}

interface OklchTokenValue {
  l: number;
  c: number;
  h: number;
  a: number;
}
type OklchToken = Token<'oklch', OklchTokenValue>;

function Oklch(): Parser<OklchToken> {
  const parseNum = CssNumber();
  const parsePerc = Percentage();
  const parseWhitespace = Regex(/\s+/);
  const parse = Seq([
    Regex(/oklch\(\s*/i),
    Alt(parsePerc, parseNum),
    parseWhitespace,
    parseNum,
    parseWhitespace,
    Angle(),
    Opt(Seq([
      Regex(/\s*\/\s*/),
      parseNum
    ])),
    Regex(/\s*\)/)
  ]);
  const parseOklch: Parser<OklchToken> = (src, index) => parse(src, index).map(t => {
    const lightness = (
      t.value[1].type === 'number'
        ? t.value[1].value
        : t.value[1].value / 100
    );
    const chroma = t.value[3].value;
    const hue = (
      t.value[5].value.unit === 'deg'
        ? t.value[5].value.angle
        : (t.value[5].value.angle / (2 * Math.PI)) * 360
    );
    const alpha = (
      t.value.length === 8
        ? t.value[6].value[1].value
        : 1
    );
    return t.produce({
      type: 'oklch',
      value: {
        l: lightness,
        c: chroma,
        h: hue,
        a: alpha
      }
    });
  });
  return parseOklch;
}

export function CntrlColorParser(): Parser<RgbaToken | OklchToken> {
  const parseColor = Alt(
    RgbComma(),
    RgbSpace(),
    Hex(),
    Oklch()
  );
  return parseColor;
}
