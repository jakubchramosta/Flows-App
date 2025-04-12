import { createContext, ReactNode, useState } from "react";
import Graph from "graphology";
import { useFordFulkerson } from "../hooks/useFordFulkerson";

export interface GraphInfo {
  graph: Graph;
  source: string;
  sink: string;
  maxFlow: number;
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
}

interface GraphProviderProps {
  children: ReactNode;
}

const GraphContext = createContext<GraphContextType>({} as GraphContextType);

export const GraphProvider = ({ children }: GraphProviderProps) => {
  const [graphs, setGraphs] = useState<GraphInfo[]>([
    { graph: new Graph(), source: "", sink: "", maxFlow: 0 },
  ]);
  const [activeGraph, setActiveGraph] = useState<number>(0);
  const [firstNodeInEdge, setFirstNodeInEdge] = useState<string | null>(null);
  const [addingEdgeMode, setAddingEdgeMode] = useState(false);

  const graph = graphs[activeGraph].graph;

  const addGraph = () => {
    const newGraph = { graph: new Graph(), source: "", sink: "", maxFlow: 0 };
    setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
    setActiveGraph(graphs.length);
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
    graphs[activeGraph].graph.addEdge(source, target, {
      label: "0/1",
      size: 7,
      flow: 0,
      capacity: 1,
    });
  };

  const removeEdge = (id: string) => {
    graphs[activeGraph].graph.dropEdge(id);
  };

  const clearGraph = () => {
    graphs[activeGraph].graph.clear();
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

  const calculateMaxFlow = (grapInfo: GraphInfo) => {
    const maxFlow = useFordFulkerson(grapInfo);
    console.log("Max flow:", maxFlow);
    const newGraphs = [...graphs];
    newGraphs[activeGraph].maxFlow = maxFlow;
    setGraphs(newGraphs);
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
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContext;
