import VPTree from "mnemonist/vp-tree";
import { difference } from "mnemonist/set";
import { memoize } from "../utils";
import { combinations } from "obliterator";

export async function buildBullsSearchTree(solutionSpace: Iterable<string>) {
  const memoized = memoize(bullsDistance, {
    resolver: memoResolver
  });
  return VPTree.from(solutionSpace, memoized);
}

export async function buildCowsSearchTree(
  symbolSpace: Iterable<string>,
  length: number
) {
  const solutions = combinations([...symbolSpace], length);
  const solutionSets = new Map<string, Set<string>>();
  for (const combination of solutions) {
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

function bullsDistance(a: string, b: string) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) result++;
  }
  return result;
}

function cowsDistance(a: Set<string>, b: Set<string>) {
  return difference(a, b).size;
}

function memoResolver(...solutions: [string, string]) {
  return solutions.sort().join("");
}
