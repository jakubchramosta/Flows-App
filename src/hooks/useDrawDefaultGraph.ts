import Graph from "graphology";

export const useDrawDefaultGraph = (graph: Graph) => {
  graph.addNode("a", { label: "A", x: -2, y: 0, size: 20, color: "#0f0" });
  graph.addNode("b", { label: "B", x: 0, y: -2, size: 20 });
  graph.addNode("c", { label: "C", x: 0, y: 2, size: 20 });
  graph.addNode("d", { label: "D", x: 2, y: 2, size: 20 });
  graph.addNode("e", { label: "E", x: 4, y: -1, size: 20, color: "#f00" });
  graph.addEdge("a", "b", { label: "0/4", size: 7 });
  graph.addEdge("a", "c", { label: "0/6", size: 7 });
  graph.addEdge("c", "b", { label: "0/3", size: 7 });
  graph.addEdge("c", "d", { label: "0/4", size: 7 });
  graph.addEdge("b", "d", { label: "0/5", size: 7 });
  graph.addEdge("b", "e", { label: "0/3", size: 7 });
  graph.addEdge("d", "e", { label: "0/4", size: 7 });
};
