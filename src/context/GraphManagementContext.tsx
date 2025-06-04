import { createContext, ReactNode, useContext, useState } from "react";
import Graph from "graphology";
import { toast } from "sonner";

export interface GraphInfo {
  graph: Graph;
  source: string;
  sink: string;
  maxFlow: number;
  paths: {
    path: string[];
    flow: number;
  }[];
  snapshots: Graph[];
}

interface GraphManagementContextType {
  graphs: GraphInfo[];
  activeGraph: number;
  addGraph: (importedGraph?: GraphInfo) => void;
  setActiveGraphIndex: (index: number) => void;
  clearGraph: () => void;
  deleteCurrentGraph: () => void;
  updateGraphInfo: (updates: Partial<GraphInfo>) => void;
  currentGraph: GraphInfo;
}

const GraphManagementContext = createContext<GraphManagementContextType>(
  {} as GraphManagementContextType,
);

export const GraphManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  const updateGraphInfo = (updates: Partial<GraphInfo>) => {
    const newGraphs = [...graphs];
    Object.assign(newGraphs[activeGraph], updates);
    setGraphs(newGraphs);
  };

  const addGraph = (importedGraph?: GraphInfo) => {
    if (graphs.length >= 10) {
      toast.error("Maximální počet grafů je 10!");
      return;
    }

    const newGraph = importedGraph || {
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

  const setActiveGraphIndex = (index: number) => {
    setActiveGraph(index);
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

  return (
    <GraphManagementContext.Provider
      value={{
        graphs,
        activeGraph,
        addGraph,
        setActiveGraphIndex,
        clearGraph,
        deleteCurrentGraph,
        updateGraphInfo,
        currentGraph: graphs[activeGraph],
      }}
    >
      {children}
    </GraphManagementContext.Provider>
  );
};

export const useGraphManagement = () => {
  const context = useContext(GraphManagementContext);
  if (!context) {
    throw new Error(
      "useGraphManagement must be used within GraphManagementProvider",
    );
  }
  return context;
};
