import { ILLEGAL_STARTING_CHARACTER } from "./symbols";
import VPTree from "mnemonist/vp-tree";
import { intersection, difference } from "mnemonist/set";
import { permutations } from "obliterator";

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

export async function buildSearchTrees(
  solutionSpace: Iterable<string>
): Promise<[VPTree<string>, VPTree<string>]> {
  return Promise.all([
    buildBullsSearchTree(solutionSpace),
    buildCowsSearchTree(solutionSpace)
  ]);
}

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

export function getItemsFromTree(searchTree: VPTree<string>): string[] {
  return searchTree["items"];
}

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
