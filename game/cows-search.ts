import VPTree from "mnemonist/vp-tree";
import permutations from "obliterator/permutations";
import { ILLEGAL_STARTING_CHARACTER } from "./symbols";

export function cowsSearch(
  tree: VPTree<string>,
  query: string,
  cows: number,
  isQuerySorted = false
): Set<string> {
  const distance = query.length - cows;

  if (distance === 0) {
    return calculatePermutations([query]);
  }

  if (!isQuerySorted) {
    query = query
      .split("")
      .sort()
      .join("");
  }

  const neighbors = tree.neighbors(query.length - cows, query);

  return calculatePermutations(neighbors.map(neighbor => neighbor.item));
}

function calculatePermutations(items: Iterable<string>) {
  const result = new Set<string>();
  for (const item of items) {
    for (const permutation of permutations(item.split(""), item.length)) {
      if (permutation[0] !== ILLEGAL_STARTING_CHARACTER)
        result.add(permutation.join(""));
    }
  }
  return result;
}
