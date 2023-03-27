import { Alt, Opt, Regex, Seq, Text } from '../Combs';
import { Parser } from '../Parser';
import { Token } from '../Token';

/**
 * Creates CSS number parser
 * 42, .42, 0.42, 42.42
 */
type CssNumberToken = Token<'number', number>;
export function CssNumber(): Parser<CssNumberToken> {
  const parse = Regex(/[+-]?(?:\d*\.\d|\d)\d*/);
  const parseCssNumber: Parser<CssNumberToken> = (src, index) => parse(src, index).map(t => t.produce({
    type: 'number',
    value: parseFloat(t.value[0])
  }));
  return parseCssNumber;
}

type PercentageToken = Token<'percentage', number>;
export function Percentage(): Parser<PercentageToken> {
  const parse = Seq([CssNumber(), Text('%')]);
  const parsePercentage: Parser<PercentageToken> = (src, index) => parse(src, index).map(t => t.produce({
    type: 'percentage',
    value: t.value[0].value
  }));
  return parsePercentage;
}

interface AngleValue {
  angle: number;
  unit: 'rad' | 'deg';
}

type AngleToken = Token<'angle', AngleValue>;
export function Angle(): Parser<AngleToken> {
  const parse = Seq([CssNumber(), Opt(Alt(Text('rad', true), Text('deg', true)))]);
  const parseAngle: Parser<AngleToken> = (src, index) => parse(src, index).map(t => t.produce({
    type: 'angle',
    value: {
      angle: t.value[0].value,
      unit: t.value[1]?.value ?? 'deg'
    }
  }));
  return parseAngle;
}
