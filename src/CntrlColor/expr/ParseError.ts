export class ParseError extends Error {
  static merge(errors: ParseError[], index: number) {
    return new ParseError([
      'Multiple errors occured:',
      ...errors.map(err => err instanceof Error ? err.toString() : err)
    ].join('\n'), index);
  }

  constructor(
    message: string,
    public index: number
  ) {
    super(`${message} at ${index}`);
    this.name = 'ParseError';
  }

  toString() {
    return `${this.name}: ${this.message} at ${this.index}`;
  }
}
