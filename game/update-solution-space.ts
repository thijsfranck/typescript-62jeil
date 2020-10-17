import VPTree from "mnemonist/vp-tree";
import { difference, intersection } from "mnemonist/set";
import { calculateSolutionSpace } from "./calculate-solution-space";

function calculateRemainingSolutions(
  solutionSpace: Set<string>,
  searchTree: VPTree<string>,
  guess: string,
  validPositions: number
): Set<string> {
  if (validPositions === 0) return solutionSpace;
  const neighbors = searchTree.neighbors(guess.length - validPositions, guess);
  return new Set(neighbors.map(neighbor => neighbor.item));
}

export function updateSolutionSpace(
  currentSymbolSpace: Set<string>,
  currentSolutionSpace: Set<string>,
  bullsSearchTree: VPTree<string>,
  cowsSearchTree: VPTree<string>,
  guess: string,
  bulls: number = 0,
  cows: number = 0
): [Set<string>, Set<string>] {
  let validSymbolSpace = currentSymbolSpace,
    validSolutionSpace = currentSolutionSpace;

  if (bulls > 0 || cows > 1) {
    const byBulls = calculateRemainingSolutions(
        validSolutionSpace,
        bullsSearchTree,
        guess,
        bulls
      ),
      byCows = calculateRemainingSolutions(
        validSolutionSpace,
        cowsSearchTree,
        guess,
        bulls + cows
      );
    validSolutionSpace = intersection(validSolutionSpace, byBulls, byCows);
  } else if (cows === 0) {
    validSymbolSpace = difference(validSymbolSpace, new Set(guess));

    const updatedSolutionSpace = calculateSolutionSpace(
      validSymbolSpace,
      guess.length
    );

    validSolutionSpace = intersection(validSolutionSpace, updatedSolutionSpace);
  }
  return [validSymbolSpace, validSolutionSpace];
}
