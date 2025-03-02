import { createContext, ReactNode } from "react";
import Graph from "graphology";

interface GraphContextType {
  graph: Graph;
  addNode: (id: string, attributes: object) => void;
  addEdge: (source: string, target: string) => void;
  clearGraph: () => void;
}

const graph = new Graph();

const addNode = (id: string, attributes: object) => {
  graph.addNode(id, attributes);
};

const addEdge = (source: string, target: string) => {
  graph.addEdge(source, target);
};

const clearGraph = () => {
  graph.clear();
};

const GraphContext = createContext<GraphContextType>({
  graph,
  addNode,
  addEdge,
  clearGraph,
});

interface GraphProviderProps {
  children: ReactNode;
}

export const GraphProvider = ({ children }: GraphProviderProps) => {
  return (
    <GraphContext.Provider value={{ graph, addNode, addEdge, clearGraph }}>
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContext;
