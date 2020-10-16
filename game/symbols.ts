export const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const ILLEGAL_STARTING_CHARACTER = "0";

export function calculateSymbolSpace(symbolSpaceLength: number): Set<string> {
  return new Set(symbols.slice(0, symbolSpaceLength))
}