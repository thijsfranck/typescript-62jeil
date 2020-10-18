const defaultResolver: ResolverFunction<string> = (...[arg0]: [string]) => arg0;

export const CACHE_LIMIT = 1000;

export type ResolverFunction<T> = (...args: T[]) => string;

export function memoize<R>(
  func: (...arg: string[]) => R,
  resolver?: ResolverFunction<string>
): (arg: string) => R;
export function memoize<T, R>(
  func: (...args: T[]) => R,
  resolver: ResolverFunction<T>
): (...args: T[]) => R;
export function memoize(
  func: (...args: any[]) => any,
  resolver: ResolverFunction<any> = defaultResolver
): (...args: any[]) => any {
  const cache = new Map<string, any>();

  function memoized(...args: any[]) {
    const key = resolver(args);

    if (cache.has(key)) return cache.get(key);

    const result = func.apply(null, args);

    if (cache.size >= CACHE_LIMIT) cache.clear();
    cache.set(key, result);

    return result;
  }

  Object.defineProperty(memoized, "cache", {
    get: () => cache
  });

  return memoized;
}
