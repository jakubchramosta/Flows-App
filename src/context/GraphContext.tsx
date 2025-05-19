import { createContext, ReactNode, useState } from "react";
import Graph from "graphology";
import { useFordFulkerson } from "../hooks/useFordFulkerson";
import { toast } from "sonner";
import { Algorithms } from "../components/utils/consts";
import { useEdmondsKarp } from "../hooks/useEdmondsKarp";

export interface GraphInfo {
  graph: Graph;
  source: string;
  sink: string;
  maxFlow: number;
  paths: {
    path: string[];
    flow: number;
  }[];
  snapshots: Graph[]; // Array to store graph snapshots
}

interface GraphContextType {
  graph: Graph;
  graphs: GraphInfo[];
  firstNodeInEdge: string | null;
  setFirstNodeInEdge: (id: string | null) => void;
  addGraph: () => void;
  setActiveGraphIndex: (index: number) => void;
  activeGraph: number;
  addNode: (id: string, attributes: object) => void;
  addEdge: (source: string, target: string) => void;
  clearGraph: () => void;
  removeEdge: (id: string) => void;
  removeNode: (id: string) => void;
  addingEdgeMode: boolean;
  setAddingEdgeMode: (value: boolean) => void;
  setSource: (source: string) => void;
  setSink: (sink: string) => void;
  calculateMaxFlow: (graphInfo: GraphInfo) => void;
  addToPaths: (newPath: string[], itsFlow: number) => void;
  setEdgeCapacity: (edgeId: string, capacity: number) => void;
  setSelectedAlgorithm: (alg: string) => void;
  resetGraph: () => void;
  currentSnapshotIndex: number;
  showPreviousSnapshot: () => void;
  showNextSnapshot: () => void;
  showSelectedSnapshot: (index: number) => void;
  deleteCurrentGraph: () => void;
  setEdgeStraight: (id: string) => void;
  setEdgeCurved: (id: string) => void;
  exportCurrentGraph: () => void;
  importGraph: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface GraphProviderProps {
  children: ReactNode;
}

const GraphContext = createContext<GraphContextType>({} as GraphContextType);

export const GraphProvider = ({ children }: GraphProviderProps) => {
  const [graphs, setGraphs] = useState<GraphInfo[]>([
    {
      graph: new Graph(),
      source: "",
      sink: "",
      maxFlow: 0,
      paths: [],
      snapshots: [],
    },
  ]);
  const [activeGraph, setActiveGraph] = useState<number>(0);
  const [firstNodeInEdge, setFirstNodeInEdge] = useState<string | null>(null);
  const [addingEdgeMode, setAddingEdgeMode] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    Algorithms.FORD_FULKERSON,
  );
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState<number>(0);

  const graph = graphs[activeGraph].graph;

  const addGraph = (importedGraph?: GraphInfo) => {
    if (graphs.length >= 10) {
      toast.error("Maximální počet grafů je 10!");
      return;
    }
    if (importedGraph) {
      const newGraph = {
        graph: importedGraph.graph,
        source: importedGraph.source,
        sink: importedGraph.sink,
        maxFlow: importedGraph.maxFlow,
        paths: importedGraph.paths,
        snapshots: importedGraph.snapshots,
      };
      setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
      setActiveGraph(graphs.length);
      return;
    }
    const newGraph = {
      graph: new Graph(),
      source: "",
      sink: "",
      maxFlow: 0,
      paths: [],
      snapshots: [],
    };
    setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
    setActiveGraph(graphs.length);
  };

  const switchGrapfInActiveGraphForSnapshotGraph = (index: number) => {
    const newGraphs = [...graphs];
    newGraphs[activeGraph].graph = newGraphs[activeGraph].snapshots[index];
    setGraphs(newGraphs);
  };

  const setActiveGraphIndex = (index: number) => {
    setActiveGraph(index);
  };

  const addNode = (id: string, attributes: object) => {
    graphs[activeGraph].graph.addNode(id, attributes);
  };

  const removeNode = (id: string) => {
    graphs[activeGraph].graph.dropNode(id);
  };

  const addEdge = (source: string, target: string) => {
    const opositeEdge = graph.edge(target, source);
    if (!opositeEdge) {
      graphs[activeGraph].graph.addEdge(source, target, {
        label: "0/1",
        size: 7,
        flow: 0,
        capacity: 1,
      });
    } else {
      graphs[activeGraph].graph.addEdge(source, target, {
        label: "0/1",
        size: 7,
        flow: 0,
        capacity: 1,
        type: "curved",
      });
      graph.setEdgeAttribute(opositeEdge, "type", "curved");
    }
  };

  const removeEdge = (id: string) => {
    graphs[activeGraph].graph.dropEdge(id);
  };

  const setEdgeStraight = (id: string) => {
    graph.setEdgeAttribute(id, "type", "");
  };

  const setEdgeCurved = (id: string) => {
    graph.setEdgeAttribute(id, "type", "curved");
  };

  const clearGraph = () => {
    const newGraphs = [...graphs];
    newGraphs[activeGraph].graph.clear();
    newGraphs[activeGraph].source = "";
    newGraphs[activeGraph].sink = "";
    newGraphs[activeGraph].maxFlow = 0;
    newGraphs[activeGraph].paths = [];
    newGraphs[activeGraph].snapshots = [];
    setGraphs(newGraphs);
  };

  const deleteCurrentGraph = () => {
    if (graphs.length <= 1) {
      clearGraph();
      return;
    }
    const newGraphs = [...graphs];
    newGraphs.splice(activeGraph, 1);
    setGraphs(newGraphs);
    setActiveGraph((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const setSource = (source: string) => {
    if (graphs[activeGraph].source !== "") {
      const previousSource = graphs[activeGraph].source;
      graph.setNodeAttribute(previousSource, "color", "#0091ff");
    }
    graphs[activeGraph].source = source;
    graph.setNodeAttribute(source, "color", "#0f0");
  };

  const setSink = (sink: string) => {
    if (graphs[activeGraph].sink !== "") {
      const previousSink = graphs[activeGraph].sink;
      graph.setNodeAttribute(previousSink, "color", "#0091ff");
    }
    graphs[activeGraph].sink = sink;
    graph.setNodeAttribute(sink, "color", "#f00");
  };

  const calculateMaxFlow = (graphInfo: GraphInfo) => {
    if (
      !graphInfo.source ||
      !graphInfo.sink ||
      graphInfo.source === graphInfo.sink
    ) {
      toast.error("Nastavte ZDROJ a CÍL!");
      return;
    }

    const hasPath = bfsCheckPath(graph, graphInfo.source, graphInfo.sink);
    if (!hasPath) {
      toast.error("Neexistuje žádná cesta mezi ZDROJEM a CÍLEM!");
      return;
    }

    let maxFlow = 0;

    switch (selectedAlgorithm) {
      case Algorithms.FORD_FULKERSON:
        toast.success("Používá se Ford-Fulkerson algoritmus.");
        maxFlow = useFordFulkerson(graphInfo);
        break;
      case Algorithms.EDMONDS_KARP:
        toast.success("Používá se Edmonds-Karp algoritmus.");
        maxFlow = useEdmondsKarp(graphInfo);
        break;
      default:
        maxFlow = useFordFulkerson(graphInfo);
        return;
    }
    const newGraphs = [...graphs];
    newGraphs[activeGraph].maxFlow = maxFlow;
    setGraphs(newGraphs);
    switchGrapfInActiveGraphForSnapshotGraph(0);
    updateEdgeLabels();
  };

  const bfsCheckPath = (
    graph: Graph,
    source: string,
    sink: string,
  ): boolean => {
    const visited = new Set<string>();
    const queue: string[] = [source];

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      if (currentNode === sink) {
        return true; // Path found
      }

      visited.add(currentNode);

      graph.forEachNeighbor(currentNode, (neighbor) => {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      });
    }

    return false; // No path found
  };

  const addToPaths = (newPath: string[], itsFlow: number) => {
    const newGraphs = [...graphs];
    newGraphs[activeGraph].paths.push({ path: newPath, flow: itsFlow });
    setGraphs(newGraphs);
  };

  const setEdgeCapacity = (edgeId: string, capacity: number) => {
    if (!edgeId) return;
    graph.setEdgeAttribute(edgeId, "capacity", capacity);
    graph.setEdgeAttribute(
      edgeId,
      "label",
      `${graph.getEdgeAttribute(edgeId, "flow")}/${graph.getEdgeAttribute(edgeId, "capacity")}`,
    );
  };

  const resetGraph = () => {
    const newGraphs = [...graphs];
    graphs[activeGraph].graph.forEachEdge((edge) => {
      graph.setEdgeAttribute(edge, "flow", 0);
    });
    graphs[activeGraph].graph.forEachEdge((edge) => {
      graph.setEdgeAttribute(edge, "color", "#ccc"); // Reset all edges to black
    });
    newGraphs[activeGraph].maxFlow = 0;
    newGraphs[activeGraph].paths = [];
    newGraphs[activeGraph].snapshots = [];
    setGraphs(newGraphs);
    updateEdgeLabels();
    setCurrentSnapshotIndex(0);
  };

  const updateEdgeLabels = () => {
    graph.forEachEdge((edge) => {
      const flow = graph.getEdgeAttribute(edge, "flow");
      const capacity = graph.getEdgeAttribute(edge, "capacity");
      graph.setEdgeAttribute(edge, "label", `${flow}/${capacity}`);
    });
  };

  const showPreviousSnapshot = () => {
    if (currentSnapshotIndex > 0) {
      console.log("showPreviousSnapshot", currentSnapshotIndex);
      setCurrentSnapshotIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        switchGrapfInActiveGraphForSnapshotGraph(newIndex);
        return newIndex;
      });
    }
  };

  const showNextSnapshot = () => {
    if (currentSnapshotIndex < graphs[activeGraph].snapshots.length - 1) {
      console.log("showNextSnapshot", currentSnapshotIndex);
      setCurrentSnapshotIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        switchGrapfInActiveGraphForSnapshotGraph(newIndex);
        return newIndex;
      });
    }
  };

  const showSelectedSnapshot = (index: number) => {
    if (index >= 0 && index < graphs[activeGraph].snapshots.length) {
      console.log("showSelectedSnapshot", index);
      setCurrentSnapshotIndex(index);
      switchGrapfInActiveGraphForSnapshotGraph(index);
    }
  };

  const exportCurrentGraph = () => {
    const exportableData = {
      graph: graphs[activeGraph].graph.export(),
      source: graphs[activeGraph].source,
      sink: graphs[activeGraph].sink,
    };

    const jsonStr = JSON.stringify(exportableData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "my-graph.json";
    a.click();

    URL.revokeObjectURL(url);

    // const jsonData = new Blob([JSON.stringify(graphs[activeGraph])], {
    //   type: "application/json",
    // });
    // const jsonURL = URL.createObjectURL(jsonData);
    // const link = document.createElement("a");
    // link.href = jsonURL;
    // link.download = "Graph.json";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const importGraph = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Implementovat importování grafu
    console.log("handleInputChange");
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const importedGraph = {
          graph: Graph.from(json.graph), // ← znovuvytvoření instance
          source: json.source,
          sink: json.sink,
          maxFlow: 0,
          paths: [],
          snapshots: [],
        };
        addGraph(importedGraph);
        console.log("Pokus o import:", json);
      } catch (err) {
        toast.error("Soubor není validní JSON.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <GraphContext.Provider
      value={{
        graph,
        graphs,
        firstNodeInEdge,
        setFirstNodeInEdge,
        addGraph,
        setActiveGraphIndex,
        activeGraph,
        addNode,
        addEdge,
        clearGraph,
        removeEdge,
        removeNode,
        addingEdgeMode,
        setAddingEdgeMode,
        setSource,
        setSink,
        calculateMaxFlow,
        addToPaths,
        setEdgeCapacity,
        setSelectedAlgorithm,
        resetGraph,
        currentSnapshotIndex,
        showPreviousSnapshot,
        showNextSnapshot,
        showSelectedSnapshot,
        deleteCurrentGraph,
        setEdgeStraight,
        setEdgeCurved,
        exportCurrentGraph,
        importGraph,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContext;
