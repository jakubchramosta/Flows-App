import Graph from "graphology";

// Ověří, zda je cesta validní augmentační cesta v aktuálním grafu.
export const isValidAugmentingPath = (
  path: string[],
  graph: Graph,
): boolean => {
  if (path.length < 2) return false;
  for (let i = 0; i < path.length - 1; i++) {
    const source = path[i];
    const target = path[i + 1];
    if (!graph.hasEdge(source, target)) {
      return false; // Hrana neexistuje
    }
    const edge = graph.edge(source, target);
    const capacity = graph.getEdgeAttribute(edge, "capacity");
    const flow = graph.getEdgeAttribute(edge, "flow");
    if (capacity - flow <= 0) {
      return false; // Není zbytková kapacita
    }
  }
  return true;
};

// Updatuje tok u všech hran v augmentační cestě.
export const updateFlowAlongPath = (
  path: string[],
  graph: Graph,
  flow: number,
) => {
  for (let i = 0; i < path.length - 1; i++) {
    const source = path[i];
    const target = path[i + 1];
    const edge = graph.edge(source, target);
    graph.setEdgeAttribute(
      edge,
      "flow",
      graph.getEdgeAttribute(edge, "flow") + flow,
    );
  }
};
