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
    if (graphInfo.sink === source) graphInfo.sink = "";
    if (graphInfo.source) {
      graph.setNodeAttribute(graphInfo.source, "color", Colors.DEFAULT_NODE);
    }
    updateGraphInfo({ source });
    graph.setNodeAttribute(source, "color", Colors.SOURCE);
  };

  const setSink = (sink: string) => {
    if (graphInfo.source === sink) graphInfo.source = "";
    if (graphInfo.sink) {
      graph.setNodeAttribute(graphInfo.sink, "color", Colors.DEFAULT_NODE);
    }
    updateGraphInfo({ sink });
    graph.setNodeAttribute(sink, "color", Colors.SINK);
  };

  const updateNodeColors = () => {
    graph.forEachNode((node) => {});
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
