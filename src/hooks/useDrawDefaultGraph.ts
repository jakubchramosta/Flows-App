import { GraphInfo } from "../context/GraphContext";

export const useDrawDefaultGraph = (graphInfo: GraphInfo) => {
  const { graph } = graphInfo;
  graph.addNode("a", { label: "A", x: -4, y: 0, size: 20, color: "#0f0" });
  graph.addNode("b", { label: "B", x: -2, y: 2, size: 20 });
  graph.addNode("c", { label: "C", x: -2, y: -2, size: 20 });
  graph.addNode("d", { label: "D", x: 2, y: 2, size: 20 });
  graph.addNode("e", { label: "E", x: 2, y: -2, size: 20 });
  graph.addNode("f", { label: "F", x: 4, y: 0, size: 20, color: "#f00" });
  graph.addEdge("a", "b", { label: "0/3", size: 7, flow: 0, capacity: 3 });
  graph.addEdge("a", "c", { label: "0/7", size: 7, flow: 0, capacity: 7 });
  graph.addEdge("c", "b", { label: "0/5", size: 7, flow: 0, capacity: 5 });
  graph.addEdge("c", "e", { label: "0/3", size: 7, flow: 0, capacity: 3 });
  graph.addEdge("b", "d", { label: "0/3", size: 7, flow: 0, capacity: 3 });
  graph.addEdge("b", "e", { label: "0/4", size: 7, flow: 0, capacity: 4 });
  graph.addEdge("d", "e", { label: "0/3", size: 7, flow: 0, capacity: 3 });
  graph.addEdge("d", "f", { label: "0/2", size: 7, flow: 0, capacity: 2 });
  graph.addEdge("e", "f", { label: "0/6", size: 7, flow: 0, capacity: 6 });

  graphInfo.source = "a";
  graphInfo.sink = "f";
};
