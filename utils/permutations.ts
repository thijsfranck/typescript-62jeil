export function* permutations<T>(
  iterable: Iterable<T>,
  length: number
): Generator<T[]> {
  if (length === 0) return;

  const seenItems = new Set<T>();

  for (const currentItem of iterable) {
    if (seenItems.has(currentItem)) continue;
    if (length === 1) yield [currentItem];

    for (const [...permutation] of permutations(seenItems, length - 1)) {
      for (let i = 0; i < permutation.length; i++) {
        const [...clone] = permutation;
        clone.splice(i, 0, currentItem);
        yield clone;
      }
    }

    seenItems.add(currentItem);
  }
}
