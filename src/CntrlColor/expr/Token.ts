export const TOKEN_IGNORE = Symbol.for('@cntrl-site/cms-client:TokenIgnore');

type TokenType = string | symbol;

export type TokenIgnore = Token<typeof TOKEN_IGNORE, undefined>;

interface TokenParams<T extends TokenType = TokenType, V = any> {
  index: number;
  size: number;
  type: T;
  value: V;
}

interface IgnoreParams {
  index: number;
  size: number;
}

interface ProduceParams<T extends TokenType = TokenType, V = any> {
  type: T;
  value: V;
}

export class Token<T extends TokenType = TokenType, V = any> {
  static Plain<PT extends TokenType, PV>(params: TokenParams<PT, PV>): Token<PT, PV> {
    return new Token(params);
  }

  static Ignore({ index, size }: IgnoreParams): Token<typeof TOKEN_IGNORE, undefined> {
    return new Token<typeof TOKEN_IGNORE, undefined>({ index, size, type: TOKEN_IGNORE, value: undefined });
  }

  public index: number;
  public size: number;
  public type: T;
  public value: V;

  constructor({ index, size, type, value }: TokenParams<T, V>) {
    this.index = index;
    this.size = size;
    this.type = type;
    this.value = value;
  }

  produce<PT extends TokenType, PV>({ type, value }: ProduceParams<PT, PV>): Token<PT, PV> {
    return new Token<PT, PV>({ index: this.index, size: this.size, type, value });
  }

  ignore(): Token<typeof TOKEN_IGNORE, undefined> {
    return Token.Ignore({ index: this.index, size: this.size });
  }

  end() { return this.index + this.size; }

  isIgnore() { return this.type === TOKEN_IGNORE; }
}
