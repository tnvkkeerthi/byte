/**
 * Represents a type guard from `unknown` to `A`,
 */
export type Is<A> = (a: unknown) => a is A

/** Use this when you need a type guard but don't care about the result. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isUnknown: Is<unknown> = (u: unknown): u is unknown => true

export const isBigint: Is<bigint> = (u: unknown): u is bigint => typeof u === 'bigint'

export const isBoolean: Is<boolean> = (u: unknown): u is boolean => typeof u === 'boolean'

export const isString: Is<string> = (u: unknown): u is string => typeof u === 'string'

export const isNumber: Is<number> = (u: unknown): u is number => typeof u === 'number'

export const isObject: Is<object> = (u: unknown): u is object => typeof u === 'object'

export const isNull: Is<null> = (u: unknown): u is null => u === null

export const isUndefined: Is<undefined> = (u: unknown): u is undefined => u === undefined

export const isBuffer: Is<Buffer> = (u: unknown): u is Buffer => u instanceof Buffer

export const isLiteral = <A>(...as: A[]): Is<A> => (u: unknown): u is A => {
  for (const a of as) {
    if (a === u) return true
  }
  return false
}

export const isNullable = <A>(isa: Is<A>) => (u: unknown): u is A | null => isNull(u) || isa(u)

export const isOptional = <A>(isa: Is<A>) => (u: unknown): u is A | undefined => isUndefined(u) || isa(u)

export const isRequired = <A>(isa: Is<A | undefined>) => (u: unknown): u is A => !isUndefined(u) && isa(u)

export const isArray = <A>(isa: Is<A>) => (u: unknown): u is A[] => Array.isArray(u) && u.every(isa)

export const isStruct = <O extends { [key: string]: unknown }>(isas: { [K in keyof O]: Is<O[K]> }): Is<O> => (
  o
): o is O => {
  if (o === null || typeof o !== 'object') return false

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = o as any
  for (const k in isas) {
    if (!isas[k](a[k])) return false
  }
  return true
}

export const isRecord = <K extends PropertyKey, V>(isK: Is<K>, isV: Is<V>): Is<Record<K, V>> => (
  r
): r is Record<K, V> => {
  if (r === null || typeof r !== 'object') return false

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = r as any
  for (const k in a) {
    if (!isK(k) || !isV(a[k])) return false
  }
  return true
}

export function isUnion<A, B>(isA: Is<A>, isB: Is<B>): (u: unknown) => u is A | B
export function isUnion<A, B, C>(isA: Is<A>, isB: Is<B>, isC: Is<C>): (u: unknown) => u is A | B | C
export function isUnion<A, B, C, D>(isA: Is<A>, isB: Is<B>, isC: Is<C>, isD: Is<D>): (u: unknown) => u is A | B | C | D
export function isUnion<A, B, C, D, E>(
  isA: Is<A>,
  isB: Is<B>,
  isC: Is<C>,
  isD: Is<D>,
  isE: Is<E>
): (u: unknown) => u is A | B | C | D | E
export function isUnion<A, B, C, D, E, F>(
  isA: Is<A>,
  isB: Is<B>,
  isC: Is<C>,
  isD: Is<D>,
  isE: Is<E>,
  isF: Is<F>
): (u: unknown) => u is A | B | C | D | E | F

export function isUnion<A, B, C, D, E, F>(isA: Is<A>, isB: Is<B>, isC?: Is<C>, isD?: Is<D>, isE?: Is<E>, isF?: Is<F>) {
  return (u: unknown): u is A | B | C | D | E | F =>
    isA(u) || isB(u) || (isC && isC(u)) || (isD && isD(u)) || (isE && isE(u)) || (isF && isF(u)) || false
}

export function isIntersection<A, B>(isA: Is<A>, isB: Is<B>): (u: unknown) => u is A & B
export function isIntersection<A, B, C>(isA: Is<A>, isB: Is<B>, isC: Is<C>): (u: unknown) => u is A & B & C
export function isIntersection<A, B, C>(isA: Is<A>, isB: Is<B>, isC?: Is<C>) {
  return (u: unknown): u is A & B & C => isA(u) && isB(u) && (!isC || isC(u))
}
