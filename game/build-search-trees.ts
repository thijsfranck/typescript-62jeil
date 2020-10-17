import VPTree from "mnemonist/vp-tree";
import { difference } from "mnemonist/set";

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

function cowsDistance(
  solutionSets: { [solution: string]: Set<string> },
  a: string,
  b: string
) {
  return difference(solutionSets[a], solutionSets[b]).size;
}

async function buildBullsSearchTree(solutionSpace: Iterable<string>) {
  return VPTree.from(solutionSpace, bullsDistance);
}

async function buildCowsSearchTree(solutionSpace: Iterable<string>) {
  const solutionSets = {};
  for (const solution of solutionSpace) {
    solutionSets[solution] = new Set(solution);
  }
  return VPTree.from(solutionSpace, (a: string, b: string) =>
    cowsDistance(solutionSets, a, b)
  );
}
