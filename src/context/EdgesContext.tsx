import { createContext, ReactNode, useContext, useState } from "react";
import Graph from "graphology";
import { EdgeTypes } from "../components/utils/consts";

interface EdgesContextType {
  firstNodeInEdge: string | null;
  setFirstNodeInEdge: (id: string | null) => void;
  addingEdgeMode: boolean;
  setAddingEdgeMode: (value: boolean) => void;
  addEdge: (source: string, target: string) => void;
  removeEdge: (id: string) => void;
  setEdgeCapacity: (edgeId: string, capacity: number) => void;
  setEdgeFlow: (edgeId: string, flow: number) => void;
  setEdgeColor: (edgeId: string, color: string) => void;
  setEdgeType: (id: string, type: string) => void;
}

const EdgesContext = createContext<EdgesContextType>({} as EdgesContextType);

export const EdgesProvider = ({
  children,
  graph,
}: {
  children: ReactNode;
  graph: Graph;
}) => {
  const [firstNodeInEdge, setFirstNodeInEdge] = useState<string | null>(null);
  const [addingEdgeMode, setAddingEdgeMode] = useState(false);

  const addEdge = (source: string, target: string) => {
    const oppositeEdge = graph.edge(target, source);
    if (!oppositeEdge) {
      graph.addEdge(source, target, {
        label: "0/1",
        size: 7,
        flow: 0,
        capacity: 1,
      });
    } else {
      graph.addEdge(source, target, {
        label: "0/1",
        size: 7,
        flow: 0,
        capacity: 1,
        type: EdgeTypes.CURVED,
      });
      graph.setEdgeAttribute(oppositeEdge, "type", EdgeTypes.CURVED);
    }
  };

  const removeEdge = (id: string) => {
    graph.dropEdge(id);
  };

  const setEdgeType = (id: string, type: string) => {
    graph.setEdgeAttribute(id, "type", type);
  };

  const setEdgeCapacity = (edgeId: string, capacity: number) => {
    if (!edgeId) return;
    graph.setEdgeAttribute(edgeId, "capacity", capacity);
    graph.setEdgeAttribute(
      edgeId,
      "label",
      `${graph.getEdgeAttribute(edgeId, "flow")}/${capacity}`,
    );
  };

  const setEdgeFlow = (edgeId: string, flow: number) => {
    if (!edgeId) return;
    const capacity = graph.getEdgeAttribute(edgeId, "capacity");
    if (flow > capacity) {
      return;
    }
    graph.setEdgeAttribute(edgeId, "flow", flow);
    graph.setEdgeAttribute(edgeId, "label", `${flow}/${capacity}`);
  };

  const setEdgeColor = (edgeId: string, color: string) => {
    if (!edgeId) return;
    graph.setEdgeAttribute(edgeId, "color", color);
  };

  return (
    <EdgesContext.Provider
      value={{
        firstNodeInEdge,
        setFirstNodeInEdge,
        addingEdgeMode,
        setAddingEdgeMode,
        addEdge,
        removeEdge,
        setEdgeCapacity,
        setEdgeFlow,
        setEdgeColor,
        setEdgeType,
      }}
    >
      {children}
    </EdgesContext.Provider>
  );
};

export const useEdges = () => {
  const context = useContext(EdgesContext);
  if (!context) {
    throw new Error("useEdges must be used within EdgesProvider");
  }
  return context;
};

export default EdgesContext;
