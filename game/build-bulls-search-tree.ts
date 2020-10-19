import VPTree from "mnemonist/vp-tree";
import { memoize } from "../utils";

export function buildBullsSearchTree(solutionSpace: Iterable<string>) {
  const memoized = memoize(bullsDistance, {
    resolver: memoResolver
  });
  return VPTree.from(solutionSpace, memoized);
}

export function bullsDistance(a: string, b: string) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) result++;
  }
  return result;
}

function memoResolver(...solutions: [string, string]) {
  return solutions.sort().join("");
}
