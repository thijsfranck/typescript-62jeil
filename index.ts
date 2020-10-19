import {
  calculateSolutionSpace,
  calculateSymbolSpace,
  buildBullsSearchTree,
  buildCowsSearchTree,
  makeRandomGuess
} from "./game";

async function game(symbolSpaceLength: number, solutionLength: number) {
  let symbolSpace = calculateSymbolSpace(symbolSpaceLength);

  console.time("Calculating the initial solution space");
  let solutionSpace = calculateSolutionSpace(symbolSpace, solutionLength);
  console.timeEnd("Calculating the initial solution space");
  console.log(`Initial solution space size: ${solutionSpace.size}`);
  console.time("Building the bulls search tree");
  const bullsSearchTree = buildBullsSearchTree(solutionSpace);
  console.timeEnd("Building the bulls search tree");

  console.time("Building the cows search tree");
  const cowsSearchTree = buildCowsSearchTree(symbolSpace, solutionLength);
  console.timeEnd("Building the cows search tree");

  const firstGuess = makeRandomGuess(solutionSpace);
  console.log(firstGuess);
}

const d = 10;
const n = 4;
game(d, n);
