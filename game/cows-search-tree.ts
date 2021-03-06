import VPTree from "mnemonist/vp-tree";
import { difference } from "mnemonist/set";
import { combinations, permutations } from "obliterator";
import { memoize } from "../utils";

export function buildCowsSearchTree(
  symbolSpace: Iterable<string>,
  length: number
) {
  const solutionSets = new Map<string, Set<string>>();
  for (const combination of combinations([...symbolSpace], length)) {
    const solution = combination.join("");
    if (!solutionSets.has(solution)) {
      solutionSets.set(solution, new Set(solution));
    }
  }

  const calculateDistance = (a: string, b: string) =>
    cowsDistance(solutionSets.get(a), solutionSets.get(b));
  const memoized = memoize(calculateDistance, {
    resolver: memoResolver
  });

  return VPTree.from(solutionSets.keys(), memoized);
}

export function cowsSearch(
  tree: VPTree<string>,
  query: string,
  distance: number,
  isQuerySorted = false
) {
  if (!isQuerySorted) {
    query = query
      .split("")
      .sort()
      .join("");
  }

  const neighbors = tree.neighbors(distance, query);
  const solutions = calculatePermutations(
    neighbors.map(neighbor => neighbor.item)
  );

  return new Set(solutions);
}

function* calculatePermutations(items: Iterable<string>) {
  for (const item of items) {
    for (permutation of permutations(item)) {
      yield permutation.join("");
    }
  }
}

function cowsDistance(a: Set<string>, b: Set<string>) {
  return difference(a, b).size;
}

function memoResolver(...solutions: [string, string]) {
  return solutions.sort().join("");
}
