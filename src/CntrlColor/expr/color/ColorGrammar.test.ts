import { ColorParser } from './ColorGrammar';

describe('ColorGrammar', () => {
  it('should parse rgb comma notation', () => {
    const parse = ColorParser();
    const result = parse('rgb(255, 255, 255)', 0);
    expect(result.unwrap()).toMatchObject({
      type: 'rgba',
      value: {
        r: 255,
        g: 255,
        b: 255,
        a: 1
      }
    });
  });

  it('should parse rgba comma notation', () => {
    const parse = ColorParser();
    const result = parse('rgba(255, 255, 255, 0.5)', 0);
    const token = result.unwrap();
    expect(token.type).toBe('rgba');
    if (token.type !== 'rgba') return;
    expect(token.value.r).toBe(255);
    expect(token.value.g).toBe(255);
    expect(token.value.b).toBe(255);
    expect(token.value.a).toBeCloseTo(0.5);
  });

  it('should parse hex', () => {
    const parse = ColorParser();
    expect(parse('#777', 0).isOk).toBe(true);
    expect(parse('#424242', 0).isOk).toBe(true);
    expect(parse('#42424242', 0).isOk).toBe(true);
    expect(parse('#fffffg', 0).isOk).toBe(false);
  });

  it('should parse oklch', () => {
    const parse = ColorParser();
    const woAlpha = parse('oklch(75% 0.5 185deg)', 0).unwrap();
    const wAlpha = parse('oklch(75% 0.5 3.14159rad / 0.3)', 0).unwrap();
    // w/o alpha
    expect(woAlpha.type).toBe('oklch');
    if (woAlpha.type === 'oklch') {
      expect(woAlpha.value.l).toBeCloseTo(0.75);
      expect(woAlpha.value.c).toBeCloseTo(0.5);
      expect(woAlpha.value.h).toBeCloseTo(185);
      expect(woAlpha.value.a).toBeCloseTo(1);
    }
    // w/ alpha
    expect(wAlpha.type).toBe('oklch');
    if (wAlpha.type === 'oklch') {
      expect(wAlpha.value.l).toBeCloseTo(0.75);
      expect(wAlpha.value.c).toBeCloseTo(0.5);
      expect(wAlpha.value.h).toBeCloseTo(180, 0);
      expect(wAlpha.value.a).toBeCloseTo(0.3);
    }
  });
});
