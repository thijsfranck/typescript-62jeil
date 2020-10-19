import { ILLEGAL_STARTING_CHARACTER } from "./symbols";
import permutations  from "obliterator/permutations";

export function calculateSolutionSpace(
  symbolSpace: Iterable<string>,
  solutionLength: number
): Set<string> {
  const solutionSpace = new Set<string>();
  for (const permutation of permutations([...symbolSpace], solutionLength)) {
    if (permutation[0] !== ILLEGAL_STARTING_CHARACTER) {
      const solution = permutation.join("");
      solutionSpace.add(solution);
    }
  }
  return solutionSpace;
}
