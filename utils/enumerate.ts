export function* enumerate<T>(iterable: Iterable<T>): Generator<[T, number]> {
  let index = 0;
  for (const item of iterable) {
    yield [item, index];
    index++;
  }
}
