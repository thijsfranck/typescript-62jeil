import levenshtein from "js-levenshtein";

function hammingDistance(a: string, b: string) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) result++;
  }
  return result;
}

export function editDistance(a: string, b: string) {
  return a.length === b.length ? hammingDistance(a, b) : levenshtein(a, b);
}
