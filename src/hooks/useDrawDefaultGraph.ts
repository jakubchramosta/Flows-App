import Graph from "graphology";

export const useDrawDefaultGraph = (graph: Graph) => {
  graph.addNode("a", { label: "A", x: 0, y: 0, size: 20 });
  graph.addNode("b", { label: "B", x: 1, y: 1, size: 20 });
  graph.addNode("c", { label: "C", x: 2, y: 2, size: 20 });
  graph.addEdge("a", "b");
  graph.addEdge("b", "c");
};
