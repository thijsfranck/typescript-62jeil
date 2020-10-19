import VPTree from "mnemonist/vp-tree";
import { difference } from "mnemonist/set";
import { memoize } from "../utils";

export async function buildSearchTrees(
  solutionSpace: Iterable<string>
): Promise<[VPTree<string>, VPTree<string>]> {
  return Promise.all([
    buildBullsSearchTree(solutionSpace),
    buildCowsSearchTree(solutionSpace)
  ]);
}

async function buildBullsSearchTree(solutionSpace: Iterable<string>) {
  const memoized = memoize(bullsDistance, {
    resolver: bullsResolver
  });
  return VPTree.from(solutionSpace, memoized);
}

async function buildCowsSearchTree(solutionSpace: Iterable<string>) {
  const solutionSets = new Map<string, Set<string>>();

  for (const solution of solutionSpace) {
    const sorted = sortString(solution);
    if (!solutionSets.has(sorted)) {
      solutionSets.set(sorted, new Set(sorted));
    }
  }
  const calculateDistance = (a: string, b: string) =>
    cowsDistance(solutionSets.get(a), solutionSets.get(b));
  const memoized = memoize(calculateDistance, {
    resolver: cowsResolver
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

function bullsResolver(...solutions: [string, string]) {
  return solutions.sort().join("");
}

function cowsDistance(a: Set<string>, b: Set<string>) {
  return difference(a, b).size;
}

function cowsResolver(a: string, b: string) {
  return sortString(a.concat(b));
}

function sortString(str: string) {
  return str
    .split("")
    .sort()
    .join("");
}
