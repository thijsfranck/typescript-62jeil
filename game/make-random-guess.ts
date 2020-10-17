import { enumerate } from "../utils";

export function makeRandomGuess(solutionSpace: Set<string>) {
  const guess = Math.floor(Math.random() * solutionSpace.size);
  for (const [item, index] of enumerate(solutionSpace)) {
    if (guess === index) return item;
  }
}
