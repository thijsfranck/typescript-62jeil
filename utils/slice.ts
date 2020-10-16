export function* slice<T>(iterable: Iterable<T>, amount: number) {
  let i = 0;
  for (const item of iterable) {
    if (i >= amount) break;
    yield item;
    i++;
  }
}
