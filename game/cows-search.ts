import VPTree from "mnemonist/vp-tree";
import { add } from "mnemonist/set";
import { calculateSolutionSpace } from "./calculate-solution-space";

export function cowsSearch(
  tree: VPTree<string>,
  query: string,
  cows: number,
  isQuerySorted = false
): Set<string> {
  const distance = query.length - cows;

  if (distance === 0) {
    return calculateSolutions([query]);
  }

  if (!isQuerySorted) {
    query = query
      .split("")
      .sort()
      .join("");
  }

  const neighbors = tree.neighbors(query.length - cows, query);

  return calculateSolutions(neighbors.map(neighbor => neighbor.item));
}

function calculateSolutions(items: Iterable<string>) {
  const result = new Set<string>();
  for (const item of items) {
    add(result, calculateSolutionSpace(item, item.length));
  }
  return result;
}
