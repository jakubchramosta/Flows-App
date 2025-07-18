import Graph from "graphology";
import { GraphInfo } from "../context/GraphManagementContext";
import { Colors, GraphTypes } from "../components/utils/consts";

export const useDrawDefaultGraph = (
  graphInfo: GraphInfo,
  graphtype: string,
) => {
  const { graph } = graphInfo;
  const edgeSize = 10;
  const nodeSize = 20;

  // Definice funkcí pro vykreslení různých typů grafů
  // Testovací graf pro základní příklad
  const drawExapmleGraph = (graph: Graph, graphInfo: GraphInfo) => {
    // Definice uzlů
    graph.addNode("a", {
      label: "A",
      x: -2,
      y: 0,
      size: nodeSize,
      color: Colors.SOURCE,
    });
    graph.addNode("b", { label: "B", x: -1, y: 1, size: nodeSize });
    graph.addNode("c", { label: "C", x: -1, y: -1, size: nodeSize });
    graph.addNode("d", { label: "D", x: 1, y: 1, size: nodeSize });
    graph.addNode("e", { label: "E", x: 1, y: -1, size: nodeSize });
    graph.addNode("f", {
      label: "F",
      x: 2,
      y: 0,
      size: nodeSize,
      color: Colors.SINK,
    });

    // Definice hran
    graph.addEdge("a", "b", {
      label: "0/3",
      size: edgeSize,
      flow: 0,
      capacity: 3,
      isReverse: false,
      color: Colors.GREEN_EDGE,
    });
    graph.addEdge("a", "c", {
      label: "0/7",
      size: edgeSize,
      flow: 0,
      capacity: 7,
      isReverse: false,
      color: Colors.RED_EDGE,
    });
    graph.addEdge("c", "b", {
      label: "0/5",
      size: edgeSize,
      flow: 0,
      capacity: 5,
      isReverse: false,
      color: Colors.RESIDUAL,
    });
    graph.addEdge("c", "e", {
      label: "0/3",
      size: edgeSize,
      flow: 0,
      capacity: 3,
      isReverse: false,
    });
    graph.addEdge("b", "d", {
      label: "0/3",
      size: edgeSize,
      flow: 0,
      capacity: 3,
      isReverse: false,
    });
    graph.addEdge("b", "e", {
      label: "0/4",
      size: edgeSize,
      flow: 0,
      capacity: 4,
      isReverse: false,
    });
    graph.addEdge("d", "e", {
      label: "0/3",
      size: edgeSize,
      flow: 0,
      capacity: 3,
      isReverse: false,
    });
    graph.addEdge("d", "f", {
      label: "0/2",
      size: edgeSize,
      flow: 0,
      capacity: 2,
      isReverse: false,
    });
    graph.addEdge("e", "f", {
      label: "0/6",
      size: edgeSize,
      flow: 0,
      capacity: 6,
      isReverse: false,
    });

    // Definice zdroje a stoku
    graphInfo.source = "a";
    graphInfo.sink = "f";
  };

  //Jednoduchý lineární graf
  const drawSimpleLinearGraph = (graph: Graph, graphInfo: GraphInfo) => {
    // Definice uzlů
    graph.addNode("a", {
      label: "A",
      x: -3,
      y: 0,
      size: nodeSize,
      color: Colors.SOURCE,
    });
    graph.addNode("b", { label: "B", x: -1, y: 1, size: nodeSize });
    graph.addNode("c", { label: "C", x: -1, y: -1, size: nodeSize });
    graph.addNode("d", {
      label: "D",
      x: 1,
      y: 0,
      size: nodeSize,
      color: Colors.SINK,
    });

    // Definice hran
    graph.addEdge("a", "b", {
      label: "0/5",
      size: edgeSize,
      flow: 0,
      capacity: 5,
      isReverse: false,
    });
    graph.addEdge("a", "c", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("b", "d", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("c", "d", {
      label: "0/5",
      size: edgeSize,
      flow: 0,
      capacity: 5,
      isReverse: false,
    });

    // Definice zdroje a stoku
    graphInfo.source = "a";
    graphInfo.sink = "d";
  };

  //Graf s více cestami
  const drawGraphWithMorePaths = (graph: Graph, graphInfo: GraphInfo) => {
    // Definice uzlů
    graph.addNode("s", {
      label: "S",
      x: -2,
      y: 0,
      size: nodeSize,
      color: Colors.SOURCE,
    });
    graph.addNode("u", { label: "U", x: -1, y: 1, size: nodeSize });
    graph.addNode("v", { label: "V", x: -1, y: -1, size: nodeSize });
    graph.addNode("w", { label: "W", x: 1, y: 1, size: nodeSize });
    graph.addNode("x", { label: "X", x: 1, y: -1, size: nodeSize });
    graph.addNode("t", {
      label: "T",
      x: 2,
      y: 0,
      size: nodeSize,
      color: Colors.SINK,
    });

    // Definice hran
    graph.addEdge("s", "u", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("s", "v", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("u", "w", {
      label: "0/4",
      size: edgeSize,
      flow: 0,
      capacity: 4,
      isReverse: false,
    });
    graph.addEdge("u", "x", {
      label: "0/8",
      size: edgeSize,
      flow: 0,
      capacity: 8,
      isReverse: false,
    });
    graph.addEdge("v", "x", {
      label: "0/9",
      size: edgeSize,
      flow: 0,
      capacity: 9,
      isReverse: false,
    });
    graph.addEdge("w", "t", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("x", "t", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });

    // Definice zdroje a stoku
    graphInfo.source = "s";
    graphInfo.sink = "t";
  };

  //Graf s cyklem
  const drawGraphWithCycle = (graph: Graph, graphInfo: GraphInfo) => {
    // Definice uzlů
    graph.addNode("s", {
      label: "S",
      x: -2,
      y: 0,
      size: nodeSize,
      color: Colors.SOURCE,
    });
    graph.addNode("a", { label: "A", x: -1, y: 1, size: nodeSize });
    graph.addNode("b", { label: "B", x: -1, y: -1, size: nodeSize });
    graph.addNode("c", { label: "C", x: 1, y: 1, size: nodeSize });
    graph.addNode("d", { label: "D", x: 1, y: 0, size: nodeSize });
    graph.addNode("e", { label: "E", x: 1, y: -1, size: nodeSize });
    graph.addNode("t", {
      label: "T",
      x: 2,
      y: 0,
      size: nodeSize,
      color: Colors.SINK,
    });

    // Definice hran
    graph.addEdge("s", "a", {
      label: "0/8",
      size: edgeSize,
      flow: 0,
      capacity: 8,
      isReverse: false,
    });
    graph.addEdge("s", "b", {
      label: "0/7",
      size: edgeSize,
      flow: 0,
      capacity: 7,
      isReverse: false,
    });
    graph.addEdge("b", "a", {
      label: "0/8",
      size: edgeSize,
      flow: 0,
      capacity: 8,
      isReverse: false,
      type: "curved",
    });
    graph.addEdge("a", "b", {
      label: "0/5",
      size: edgeSize,
      flow: 0,
      capacity: 5,
      isReverse: false,
      type: "curved",
    });
    graph.addEdge("a", "c", {
      label: "0/9",
      size: edgeSize,
      flow: 0,
      capacity: 9,
      isReverse: false,
    });
    graph.addEdge("e", "b", {
      label: "0/5",
      size: edgeSize,
      flow: 0,
      capacity: 5,
      isReverse: false,
    });
    graph.addEdge("d", "c", {
      label: "0/4",
      size: edgeSize,
      flow: 0,
      capacity: 4,
      isReverse: false,
    });
    graph.addEdge("c", "t", {
      label: "0/8",
      size: edgeSize,
      flow: 0,
      capacity: 8,
      isReverse: false,
    });
    graph.addEdge("e", "t", {
      label: "0/8",
      size: edgeSize,
      flow: 0,
      capacity: 8,
      isReverse: false,
    });
    graph.addEdge("d", "e", {
      label: "0/3",
      size: edgeSize,
      flow: 0,
      capacity: 3,
      isReverse: false,
    });
    graph.addEdge("d", "t", {
      label: "0/7",
      size: edgeSize,
      flow: 0,
      capacity: 7,
      isReverse: false,
    });
    graph.addEdge("d", "a", {
      label: "0/4",
      size: edgeSize,
      flow: 0,
      capacity: 4,
      isReverse: false,
    });
    graph.addEdge("b", "d", {
      label: "0/4",
      size: edgeSize,
      flow: 0,
      capacity: 4,
      isReverse: false,
    });

    // Zdroj a stok
    graphInfo.source = "s";
    graphInfo.sink = "t";
  };

  const drawKomplexGraph = (graph: Graph, graphInfo: GraphInfo) => {
    // Definice uzlů
    graph.addNode("s", {
      label: "S",
      x: -2,
      y: 0,
      size: nodeSize,
      color: Colors.SOURCE,
    });
    graph.addNode("a", { label: "A", x: -1, y: 1, size: nodeSize });
    graph.addNode("b", { label: "B", x: -1, y: 0, size: nodeSize });
    graph.addNode("c", { label: "C", x: -1, y: -1, size: nodeSize });
    graph.addNode("d", { label: "D", x: 1, y: 1, size: nodeSize });
    graph.addNode("e", { label: "E", x: 1, y: 0, size: nodeSize });
    graph.addNode("f", { label: "F", x: 1, y: -1, size: nodeSize });
    graph.addNode("t", {
      label: "T",
      x: 2,
      y: 0,
      size: nodeSize,
      color: Colors.SINK,
    });

    // Definice hran
    graph.addEdge("s", "a", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("s", "b", {
      label: "0/5",
      size: edgeSize,
      flow: 0,
      capacity: 5,
      isReverse: false,
    });
    graph.addEdge("s", "c", {
      label: "0/15",
      size: edgeSize,
      flow: 0,
      capacity: 15,
      isReverse: false,
    });
    graph.addEdge("a", "d", {
      label: "0/9",
      size: edgeSize,
      flow: 0,
      capacity: 9,
      isReverse: false,
    });
    graph.addEdge("a", "e", {
      label: "0/15",
      size: edgeSize,
      flow: 0,
      capacity: 15,
      isReverse: false,
    });
    graph.addEdge("a", "b", {
      label: "0/4",
      size: edgeSize,
      flow: 0,
      capacity: 4,
      isReverse: false,
    });
    graph.addEdge("b", "c", {
      label: "0/4",
      size: edgeSize,
      flow: 0,
      capacity: 4,
      isReverse: false,
    });
    graph.addEdge("b", "e", {
      label: "0/8",
      size: edgeSize,
      flow: 0,
      capacity: 8,
      isReverse: false,
    });
    graph.addEdge("f", "b", {
      label: "0/6",
      size: edgeSize,
      flow: 0,
      capacity: 6,
      isReverse: false,
    });
    graph.addEdge("c", "f", {
      label: "0/16",
      size: edgeSize,
      flow: 0,
      capacity: 16,
      isReverse: false,
    });
    graph.addEdge("d", "t", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("d", "e", {
      label: "0/15",
      size: edgeSize,
      flow: 0,
      capacity: 15,
      isReverse: false,
    });
    graph.addEdge("e", "t", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });
    graph.addEdge("e", "f", {
      label: "0/15",
      size: edgeSize,
      flow: 0,
      capacity: 15,
      isReverse: false,
    });
    graph.addEdge("f", "t", {
      label: "0/10",
      size: edgeSize,
      flow: 0,
      capacity: 10,
      isReverse: false,
    });

    // Definice zdroje a stoku
    graphInfo.source = "s";
    graphInfo.sink = "t";
  };

  // Vykreslení grafu podle typu
  switch (graphtype) {
    case GraphTypes.EXAMPLE:
      drawExapmleGraph(graph, graphInfo);
      break;
    case GraphTypes.SIMPLE_LINEAR:
      drawSimpleLinearGraph(graph, graphInfo);
      break;
    case GraphTypes.MANY_PATHS:
      drawGraphWithMorePaths(graph, graphInfo);
      break;
    case GraphTypes.CYCLE:
      drawGraphWithCycle(graph, graphInfo);
      break;
    case GraphTypes.COMPLEX:
      drawKomplexGraph(graph, graphInfo);
      break;
    default:
      drawExapmleGraph(graph, graphInfo);
      break;
  }
};
