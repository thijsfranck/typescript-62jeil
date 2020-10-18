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

async function buildBullsSearchTree(solutionSpace: Iterable<string>) {
  const resolver = (a: string, b: string) => a.concat(b);
  const memoized = memoize(bullsDistance, resolver);
  return VPTree.from(solutionSpace, memoized);
}

async function buildCowsSearchTree(solutionSpace: Iterable<string>) {
  const solutionSets = {};
  for (const solution of solutionSpace) {
    solutionSets[solution] = new Set(solution);
  }
  const lookupFunction = (a: string, b: string) =>
    cowsDistance(solutionSets[a], solutionSets[b]);
  const resolver = (a: string, b: string) =>
    a
      .concat(b)
      .split("")
      .sort()
      .join("");
  const memoized = memoize(lookupFunction, resolver);
  return VPTree.from(solutionSpace, memoized);
}
