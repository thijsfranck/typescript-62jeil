import VPTree from "mnemonist/vp-tree";

export function bullsSearch(
  tree: VPTree<string>,
  query: string,
  bulls: number
): Set<string> {
  const distance = query.length - bulls;

  if (distance === 0) return new Set([query]);

  const neighbors = tree.neighbors(query.length - bulls, query);
  const solutions = neighbors.map(neighbor => neighbor.item);
  return new Set(solutions);
}
