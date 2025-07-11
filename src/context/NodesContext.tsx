import { createContext, ReactNode, useContext, useState } from "react";
import Graph from "graphology";
import { Colors } from "../components/utils/consts";

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
    updateGraphInfo({ source });
    graph.setNodeAttribute(source, "color", Colors.SOURCE);
  };

  const setSink = (sink: string) => {
    updateGraphInfo({ sink });
    graph.setNodeAttribute(sink, "color", Colors.SINK);
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
