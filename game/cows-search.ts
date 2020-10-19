import VPTree from "mnemonist/vp-tree";
import permutations from "obliterator/permutations";

export function cowsSearch(
  tree: VPTree<string>,
  query: string,
  cows: number,
  isQuerySorted = false
): Set<string> {
  if (!isQuerySorted) {
    query = query
      .split("")
      .sort()
      .join("");
  }

  const neighbors = tree.neighbors(query.length - cows, query);
  const solutions = calculatePermutations(
    neighbors.map(neighbor => neighbor.item)
  );

  return new Set(solutions);
}

function* calculatePermutations(items: Iterable<string>) {
  for (const item of items) {
    for (const permutation of permutations(item.split(""), item.length)) {
      if (permutation[0] !== "0") yield permutation.join("");
    }
  }
}
