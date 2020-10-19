import { ILLEGAL_STARTING_CHARACTER } from "./symbols";
import permutations from "obliterator/permutations";
import { memoize } from "../utils";

export const calculateSolutionSpace = memoize(_calculateSolutionSpace, {
  resolver: memoResolver
});

function _calculateSolutionSpace(
  symbolSpace: Iterable<string>,
  solutionLength: number
): Set<string> {
  const solutionSpace = new Set<string>();
  for (const permutation of permutations([...symbolSpace], solutionLength)) {
    if (permutation[0] !== ILLEGAL_STARTING_CHARACTER) {
      solutionSpace.add(permutation.join(""));
    }
  }
  return solutionSpace;
}

function memoResolver(symbolSpace: Iterable<string>, solutionLength: number) {
  return [...symbolSpace]
    .sort()
    .join("")
    .concat(solutionLength.toString());
}
