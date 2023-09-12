import { ParseError } from './ParseError';
import { Parser } from './Parser';
import { Result } from './Result';
import { Token, TokenIgnore } from './Token';

export function Text<Sample extends string>(text: Sample, ci: boolean = false): Parser<Token<'text', Sample>> {
  function isMatch(sample: string): sample is Sample {
    return ci ? (text.toLowerCase() === sample.toLowerCase()) : (text === sample);
  }
  return (src, index) => {
    const sample = src.slice(index, index + text.length);
    if (!isMatch(sample)) {
      return Result.Err<Token<'text', Sample>, ParseError>(
        new ParseError(`Expects "${text}" instead got "${sample}"`, index)
      );
    }
    return Result.Ok<Token<'text', Sample>, ParseError>(Token.Plain<'text', Sample>({
      index,
      size: sample.length,
      type: 'text',
      value: sample
    }));
  };
}

export function Regex(re: RegExp): Parser<Token<'regex', RegExpExecArray>> {
  const pattern = new RegExp(re, /g/i.test(re.flags) ? re.flags : `${re.flags}g`);
  const parseRegex: Parser<Token<'regex', RegExpExecArray>> = (src, index) => {
    pattern.lastIndex = index;
    const match = pattern.exec(src);
    if (!match || match.index !== index) {
      return Result.Err(new ParseError(`Cannot match "${pattern}"`, index));
    }
    return Result.Ok(Token.Plain({
      index,
      size: match[0].length,
      type: 'regex',
      value: match
    }));
  };
  return parseRegex;
}

export function Ignore(parse: Parser<Token>): Parser<TokenIgnore> {
  return (src, index) => parse(src, index).map(t => t.ignore());
}

export function Opt<T extends (string | symbol), V>(
  parse: Parser<Token<T, V>>
): Parser<Token<T, V> | TokenIgnore> {
  return (src, index) => {
    const res = parse(src, index);
    return res.mapOrElse(
      () => Result.Ok(Token.Ignore({ index, size: 0 })),
      () => res
    );
  };
}

type TokensOf<Ps extends Parser[]> = {
  [K in number]: Ps[K] extends Parser<infer T> ? T : never;
}[number];

export function Alt<Ps extends Parser[]>(...parsers: [...Ps]): Parser<TokensOf<Ps>> {
  // @ts-ignore
  const parseAlt: Parser<TokensOf<Ps>> = (src, index) => {
    const errors = [];
    for (const parse of parsers) {
      const res = parse(src, index);
      if (res.isOk()) {
        return res;
      }
      errors.push(res.unwrapErr());
    }
    return Result.Err(ParseError.merge(errors, index));
  };
  return parseAlt;
}

type TokenList<Ps extends Parser[]> = {
  [K in keyof Ps]: Ps[K] extends Parser<infer T> ? (T extends TokenIgnore ? never : T) : Ps[K];
};
export function Seq<Ps extends Parser[]>(
  parsers: [...Ps],
  checkEnd?: Parser
): Parser<Token<'sequence', TokenList<Ps>>> {
  // @ts-ignore
  const parseSeq: Parser<Token<'sequence', TokenList<Ps>>> = (src, index) => {
    const items = [];
    let lastIndex = index;
    for (const parse of parsers) {
      if (lastIndex >= src.length) {
        return Result.Err(new ParseError('Unexpected end of input', lastIndex));
      }
      const res = parse(src, lastIndex);
      if (res.isErr()) {
        if (checkEnd && checkEnd(src, lastIndex).isOk()) {
          break;
        } else {
          return res;
        }
      }
      const token = res.unwrap();
      lastIndex = token.end();
      if (!token.isIgnore()) {
        items.push(token);
      }
    }
    if (items.length === 0) {
      return Result.Err(new ParseError('Cannot match sequence', lastIndex));
    }
    return Result.Ok(Token.Plain({
      index,
      size: lastIndex - index,
      type: 'sequence',
      value: items
    }));
  };
  return parseSeq;
}

export function List<T extends Token>(
  parseItem: Parser<T>,
  parseDelim: Parser,
  checkEnd: Parser
): Parser<Token<'list', T[]>> {
  return (src, index) => {
    const items: T[] = [];
    let lastIndex = index;
    while (lastIndex < src.length) {
      const itemRes = parseItem(src, lastIndex);
      if (itemRes.isErr()) {
        return Result.Err(itemRes.unwrapErr());
      }
      const itemToken = itemRes.unwrap();
      if (!itemToken.isIgnore) {
        items.push(itemToken);
      }
      lastIndex = itemToken.end();
      if (checkEnd && checkEnd(src, lastIndex).isOk()) {
        break;
      }
      if (parseDelim) {
        const delimRes = parseDelim(src, lastIndex);
        if (delimRes.isErr()) {
          break;
        }
        lastIndex = delimRes.unwrap().end();
      }
    }
    if (items.length === 0) {
      return Result.Err(new ParseError('Cannot match list', lastIndex));
    }
    return Result.Ok(Token.Plain({
      index,
      size: lastIndex - index,
      type: 'list',
      value: items
    }));
  };
}
