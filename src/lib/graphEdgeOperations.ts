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
    if (graph.getEdgeAttribute(edge, "isReverse")) {
      graph.setEdgeAttribute(edge, "color", Colors.RESIDUAL);
    } else {
      graph.setEdgeAttribute(edge, "color", Colors.DEFAULT_EDGE);
    }
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

export const updateEdgesFlow = (graph: Graph, flow: number, path: string[]) => {
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const edge = graph.edge(u, v);
    const attrs = graph.getEdgeAttributes(edge);
    graph.setEdgeAttribute(edge, "flow", flow + attrs.flow);

    // Update reverse edge flow
    const reverseEdge = graph.edge(v, u);
    const reverseAttrs = graph.getEdgeAttributes(reverseEdge);
    graph.setEdgeAttribute(reverseEdge, "flow", reverseAttrs.flow - flow);
  }
};
