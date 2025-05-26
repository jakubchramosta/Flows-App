import { Colors } from "../components/utils/consts";
import Graph from "graphology";

// Funkce pro zvýraznění aktuální cesty v grafu
export const highlightCurrentPath = (graph: Graph, path: string[]) => {
  if (!path) return; // Pokud není cesta, nic nedělej
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const edge = graph.edge(u, v);
    const reverseEdge = graph.edge(v, u);

    if (graph.getEdgeAttributes(edge).hidden === true)
      graph.setEdgeAttribute(reverseEdge, "color", Colors.RED_EDGE);
    else graph.setEdgeAttribute(edge, "color", Colors.GREEN_EDGE);
  }
};

// Funkce pro resetování barev hran v grafu
export const resetEdgeColors = (graph: Graph) => {
  graph.forEachEdge((edge) => {
    graph.setEdgeAttribute(edge, "color", Colors.DEFAULT_EDGE); // Reset all edges to black
  });
};

// Funkce pro aktualizaci popisků hran v grafu
export const updateEdgeLabels = (graph: Graph) => {
  graph.forEachEdge((edge) => {
    const flow = graph.getEdgeAttribute(edge, "flow");
    const capacity = graph.getEdgeAttribute(edge, "capacity");
    graph.setEdgeAttribute(edge, "label", `${flow}/${capacity}`);
  });
};
