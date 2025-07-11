import { toast } from "sonner";
import { GraphInfo } from "../context/GraphManagementContext";
import Graph from "graphology";

// Ověří, zda je cesta validní augmentační cesta v aktuálním grafu.
export const isValidAugmentingPath = (
  path: string[],
  currentGraph: GraphInfo,
): boolean => {
  if (isPathComplete(path, currentGraph.source, currentGraph.sink) === false) {
    toast.error("Cesta není kompletní. Musí začínat u zdroje a končit u cíle.");
    return false;
  }
  console.log(
    "Path is complete. Path: ",
    path,
    " Source: ",
    currentGraph.source,
    " Sink: ",
    currentGraph.sink,
  );

  for (let i = 0; i < path.length - 1; i++) {
    const source = path[i];
    const target = path[i + 1];
    if (!currentGraph.graph.hasEdge(source, target)) {
      console.log("Edge does not exist", source, target);
      toast.error(`Hrana mezi uzly ${source} a ${target} neexistuje.`);
      return false; // Hrana neexistuje
    }

    console.log("Edge exists", source, target);

    const edge = currentGraph.graph.edge(source, target);
    const capacity = currentGraph.graph.getEdgeAttribute(edge, "capacity");
    const flow = currentGraph.graph.getEdgeAttribute(edge, "flow");
    if (capacity - flow <= 0) {
      toast.error(
        `Hrana mezi uzly ${source} a ${target} nemá zbytkovou kapacitu.`,
      );
      return false;
    }
    console.log(
      "Edge has residual capacity, source:",
      source,
      " target:",
      target,
      " capacity:",
      capacity,
      " flow:",
      flow,
    );
  }
  return true;
};

// Updatuje tok u všech hran v augmentační cestě.
export const updateFlowAlongPath = (
  path: string[],
  graph: Graph,
  pathFlow: number,
): void => {
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const edge = graph.edge(u, v);

    // Aktualizace toku na přímé hraně
    const currentFlow = graph.getEdgeAttribute(edge, "flow");
    graph.setEdgeAttribute(edge, "flow", currentFlow + pathFlow);

    // Aktualizace zpětné hrany
    const reverseEdge = graph.edge(v, u);
    if (reverseEdge) {
      const reverseFlow = graph.getEdgeAttribute(reverseEdge, "flow");
      graph.setEdgeAttribute(reverseEdge, "flow", reverseFlow - pathFlow);
    }
  }
};

export const isPathComplete = (
  path: string[],
  source: string,
  sink: string,
): boolean => {
  console.log("isPathComplete", path, source, sink);
  return (
    path.length >= 2 && path[0] === source && path[path.length - 1] === sink
  );
};

export const calculatePathFlow = (path: string[], graph: Graph): number => {
  console.log("Calculating path flow for:", path);
  let minFlow = Infinity;
  for (let i = 0; i < path.length - 1; i++) {
    console.log(
      "Calculating flow for path segment:",
      path[i],
      "->",
      path[i + 1],
    );
    const source = path[i];
    const target = path[i + 1];

    if (!graph.hasEdge(source, target)) {
      console.log("Edge does not exist source and target:", source, target);
      return 0; // Nevalidní cesta
    }

    const edge = graph.edge(source, target);
    const capacity = graph.getEdgeAttribute(edge, "capacity");
    const flow = graph.getEdgeAttribute(edge, "flow");
    const residualCapacity = capacity - flow;
    console.log(
      "Edge attributes:",
      edge,
      "Capacity:",
      capacity,
      "Flow:",
      flow,
      "Residual Capacity:",
      residualCapacity,
    );

    if (residualCapacity <= 0) {
      console.log(
        "No residual capacity for edge with source: ",
        source,
        " and target: ",
        target,
      );
      console.log(graph);
      return 0; // Žádná zbytková kapacita
    }

    minFlow = Math.min(minFlow, residualCapacity);
  }
  console.log("Min flow of user path:", minFlow);
  return minFlow;
};
