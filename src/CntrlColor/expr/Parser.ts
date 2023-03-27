import { ParseError } from './ParseError';
import { Result } from './Result';
import { Token } from './Token';

export interface Parser<R extends Token = Token> {
  (src: string, index: number): Result<R, ParseError>;
}
