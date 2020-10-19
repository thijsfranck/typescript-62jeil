import {
  calculateSolutionSpace,
  calculateSymbolSpace,
  buildBullsSearchTree,
  buildCowsSearchTree,
  makeRandomGuess,
  bullsDistance,
  cowsDistance
} from "./game";
import { bullsSearch } from "./game/bulls-search";
import { cowsSearch } from "./game/cows-search";
import { difference, intersection } from "mnemonist/set";

async function game(symbolSpaceLength: number, solutionLength: number) {
  console.log(
    "Rules",
    `Possible characters: ${symbolSpaceLength}`,
    `Solution length: ${solutionLength}`
  );
  console.log("Preparing the game...");

  console.time("Solved");

  let symbolSpace = calculateSymbolSpace(symbolSpaceLength),
    solutionSpace = calculateSolutionSpace(symbolSpace, solutionLength);

  const bullsSearchTree = buildBullsSearchTree(solutionSpace),
    cowsSearchTree = buildCowsSearchTree(symbolSpace, solutionLength);

  console.log("Picking a solution...");
  const solution = makeRandomGuess(solutionSpace);

  let bulls = 0,
    cows = 0,
    turn = 0;

  console.log("Solving...");

  do {
    turn++;

    const guess = makeRandomGuess(solutionSpace);

    bulls = guess.length - bullsDistance(solution, guess);
    cows = guess.length - cowsDistance(new Set(guess), new Set(solution));

    console.log({
      turn,
      guess,
      bulls,
      cows
    });

    if (cows === 0) {
      symbolSpace = difference(symbolSpace, new Set(guess));
      solutionSpace = intersection(
        solutionSpace,
        calculateSolutionSpace(symbolSpace, solutionLength)
      );
    } else if (bulls < solutionLength) {
      const byBulls = bullsSearch(bullsSearchTree, guess, bulls);
      const byCows = cowsSearch(cowsSearchTree, guess, cows);
      solutionSpace = intersection(solutionSpace, byBulls, byCows);
    }
    solutionSpace.delete(guess);
  } while (bulls < solutionLength);
  console.timeEnd("Solved");
  console.log(`Solved ${solution} in ${turn} turns!`);
}

const d = 10;
const n = 4;
game(d, n);
