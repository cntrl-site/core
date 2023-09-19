export abstract class Result<V, E> {
  static Ok<V, E>(value: V) { return new Ok<V, E>(value); }
  static Err<V, E>(error: E) { return new Err<V, E>(error); }
  isOk() { return false; }
  isErr() { return false; }
  abstract unwrap(): V;
  abstract unwrapErr(): E;
  abstract map<R>(mapFn: (value: V) => R): Result<R,E>;
  abstract mapOrElse<R1, R2>(elseFn: () => R1, mapFn: (value: V) => R2): R1 | R2;
}

export class Ok<V, E> extends Result<V,E> {
  constructor(
    private value: V
  ) {
    super();
    Object.freeze(this);
  }
  isOk() { return true; }
  unwrap() { return this.value; }
  unwrapErr(): E { throw this.value; }
  map<R>(mapFn: (value: V) => R) { return new Ok<R, E>(mapFn(this.value)); }
  mapOrElse<R>(elseFn: () => any, mapFn: (value: V) => R) { return mapFn(this.value); }
}

export class Err<V,E> extends Result<V,E> {
  constructor(
    private error: E
  ) {
    super();
    Object.freeze(this);
  }
  isErr() { return true; }
  unwrap(): V { throw this.error; }
  unwrapErr(): E { return this.error; }
  // @ts-ignore
  map<R>(mapFn: (value: any) => R): Result<R, E> { return this; }
  mapOrElse<R>(elseFn: () => R, mapFn: (value: any) => any) { return elseFn(); }
}
