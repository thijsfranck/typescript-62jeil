import VPTree from "mnemonist/vp-tree";
import { difference } from "mnemonist/set";
import combinations from "obliterator/combinations";
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

export function cowsDistance(a: Set<string>, b: Set<string>) {
  return difference(a, b).size;
}

function memoResolver(...solutions: [string, string]) {
  return solutions.sort().join("");
}
