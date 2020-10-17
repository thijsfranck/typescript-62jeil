import {
  calculateSolutionSpace,
  calculateSymbolSpace,
  buildSearchTrees,
  updateSolutionSpace
} from "./game";
import { SortedSet } from "collections/sorted-set";

async function game(symbolSpaceLength: number, solutionLength: number) {
  let symbolSpace = calculateSymbolSpace(symbolSpaceLength);

  console.time("Calculating the initial solution space");
  let solutionSpace = calculateSolutionSpace(symbolSpace, solutionLength);
  console.timeEnd("Calculating the initial solution space");
  console.log(`Initial solution space size: ${solutionSpace.size}`);
  console.time("Building the search trees");
  
  const [bullsSearchTree, cowsSearchTree] = await buildSearchTrees(
    solutionSpace
  );
  console.timeEnd("Building the search trees");

  const guess = new SortedSet([1, 2, 3, 0]),
    bulls = 0,
    cows = 3;

  console.time("Updating the solution space");
  [symbolSpace, solutionSpace] = updateSolutionSpace(
    symbolSpace,
    solutionSpace,
    bullsSearchTree,
    cowsSearchTree,
    guess,
    bulls,
    cows
  );
  console.timeEnd("Updating the solution space");
  console.log(`Solution space size: ${solutionSpace.size}`);
}

const d = 10;
const n = 1;
game(d, n);
