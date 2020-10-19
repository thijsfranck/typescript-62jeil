import {
  calculateSolutionSpace,
  calculateSymbolSpace,
  buildBullsSearchTree,
  buildCowsSearchTree,
  makeRandomGuess
} from "./game";
import { bullsSearch } from "./game/bulls-search";
import { cowsSearch } from "./game/cows-search";
import { intersection } from "mnemonist/set";

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

  const bulls = 1,
    cows = 2;

  console.time("Querying bulls");
  const byBulls = bullsSearch(bullsSearchTree, firstGuess, bulls);
  console.timeEnd("Querying bulls");
  console.log("By bulls", byBulls);

  console.time("Querying cows");
  const byCows = cowsSearch(cowsSearchTree, firstGuess, bulls + cows);
  console.timeEnd("Querying cows");
  console.log("By cows", byCows);

  console.time("Merging query results")
  solutionSpace = intersection(byBulls, byCows);
  console.timeEnd("Merging query results")
  console.log("Solution space", solutionSpace);
}

const d = 10;
const n = 4;
game(d, n);
