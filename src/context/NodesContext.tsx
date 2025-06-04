import { createContext, ReactNode, useContext, useState } from "react";
import Graph from "graphology";

interface NodesContextType {
  addNode: (id: string, attributes: object) => void;
  removeNode: (id: string) => void;
  setSource: (source: string) => void;
  setSink: (sink: string) => void;
}

const NodesContext = createContext<NodesContextType>({} as NodesContextType);

export const NodesProvider = ({
  children,
  graph,
  graphInfo,
  updateGraphInfo,
}: {
  children: ReactNode;
  graph: Graph;
  graphInfo: any;
  updateGraphInfo: (updates: any) => void;
}) => {
  const addNode = (id: string, attributes: object) => {
    graph.addNode(id, attributes);
  };

  const removeNode = (id: string) => {
    graph.dropNode(id);
  };

  const setSource = (source: string) => {
    if (graphInfo.source !== "") {
      graph.setNodeAttribute(graphInfo.source, "color", "#666");
    }
    updateGraphInfo({ source });
    graph.setNodeAttribute(source, "color", "#4CAF50");
  };

  const setSink = (sink: string) => {
    if (graphInfo.sink !== "") {
      graph.setNodeAttribute(graphInfo.sink, "color", "#666");
    }
    updateGraphInfo({ sink });
    graph.setNodeAttribute(sink, "color", "#F44336");
  };

  return (
    <NodesContext.Provider value={{ addNode, removeNode, setSource, setSink }}>
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = () => {
  const context = useContext(NodesContext);
  if (!context) {
    throw new Error("useNodes must be used within NodesProvider");
  }
  return context;
};

export default NodesContext;
