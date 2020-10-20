import DefaultMap from "mnemonist/default-map";
import { makeRandomGuess } from "./make-random-guess";
export interface Turn {
  readonly guess: string;
  readonly cows: number;
  readonly bulls: number;
}

export function makeEducatedGuess(
  turns: Iterable<Turn>,
  solutionSpace: Set<string>
) {
  let bullsCount = new DefaultMap<string, number>(() => 0);
  let cowsCount = new DefaultMap<string, number>(() => 0);

  for (const { bulls, cows, guess } of turns) {
    for (const key of guess) {
      if (bulls) bullsCount = increment(bullsCount, key, bulls);
      if (cows) cowsCount = increment(cowsCount, key, guess.length - cows);
    }
  }

  if (bullsCount.size + cowsCount.size === 0)
    return makeRandomGuess(solutionSpace);

  let guess = null;
  let maxScore = null;
  for (const solution of solutionSpace) {
    let solutionScore = 0;
    for (const key of solution) {
      solutionScore = solutionScore + bullsCount[key] + cowsCount[key];
    }
    if (!guess || solutionScore > maxScore) {
      guess = solution;
      maxScore = solutionScore;
    }
  }
  return guess;
}

function increment(map: DefaultMap<string, number>, key: string, amount = 1) {
  const currentValue = map.get(key);
  map.set(key, currentValue + amount);
  return map;
}
