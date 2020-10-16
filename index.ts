import {
  calculateSolutionSpace,
  calculateSymbolSpace,
  buildSearchTrees,
  updateSolutionSpace
} from "./game";

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

  const guess = "1230",
    bulls = 0,
    cows = 1;

  console.time("Updating the solution space");
  [symbolSpace, solutionSpace] = updateSolutionSpace(
    symbolSpace,
    solutionSpace,
    bullsSearchTree,
    cowsSearchTree,
    guess,
    solutionLength,
    bulls,
    cows
  );
  console.timeEnd("Updating the solution space");
  console.log(`Solution space size: ${solutionSpace.size}`);
}

const d = 10;
const n = 4;
game(d, n);
