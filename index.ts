import {
  calculateSolutionSpace,
  calculateSymbolSpace,
  buildSearchTrees,
  updateSolutionSpace,
  makeRandomGuess
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

  const firstGuess = makeRandomGuess(solutionSpace);
  console.log(firstGuess);
}

const d = 10;
const n = 4;
game(d, n);
