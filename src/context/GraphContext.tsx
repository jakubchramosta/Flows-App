import { createContext, ReactNode, useState } from "react";
import Graph from "graphology";

interface GraphContextType {
  graph: Graph;
  graphs: Graph[];
  addGraph: () => void;
  setActiveGraphIndex: (index: number) => void;
  activeGraph: number;
  addNode: (id: string, attributes: object) => void;
  addEdge: (source: string, target: string) => void;
  clearGraph: () => void;
  removeEdge: (id: string) => void;
}

interface GraphProviderProps {
  children: ReactNode;
}

const GraphContext = createContext<GraphContextType>({} as GraphContextType);

export const GraphProvider = ({ children }: GraphProviderProps) => {
  const [graphs, setGraphs] = useState<Graph[]>([new Graph()]);
  const [activeGraph, setActiveGraph] = useState<number>(0);

  const graph = graphs[activeGraph];

  const addGraph = () => {
    const newGraph = new Graph();
    setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
    setActiveGraph(graphs.length);
  };

  const setActiveGraphIndex = (index: number) => {
    setActiveGraph(index);
  };

  const addNode = (id: string, attributes: object) => {
    graphs[activeGraph].addNode(id, attributes);
  };

  const addEdge = (source: string, target: string) => {
    graphs[activeGraph].addEdge(source, target);
  };

  const removeEdge = (id: string) => {
    graphs[activeGraph].dropEdge(id);
  };

  const clearGraph = () => {
    graphs[activeGraph].clear();
  };

  return (
    <GraphContext.Provider
      value={{
        graph,
        graphs,
        addGraph,
        setActiveGraphIndex,
        activeGraph,
        addNode,
        addEdge,
        clearGraph,
        removeEdge,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContext;
