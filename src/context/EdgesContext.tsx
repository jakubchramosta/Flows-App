import { createContext, ReactNode, useContext, useState } from "react";
import Graph from "graphology";
import { Colors, EdgeTypes } from "../components/utils/consts";

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
  showResidualEdges: () => void;
  hideResidualEdges: () => void;
  generateResidualEdges: () => void;
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

  const showResidualEdges = () => {
    graph.forEachEdge((edge) => {
      if (graph.getEdgeAttribute(edge, "isReverse")) {
        graph.setEdgeAttribute(edge, "hidden", false);
        graph.setEdgeAttribute(edge, "type", EdgeTypes.CURVED);
        graph.setEdgeAttribute(edge, "color", Colors.RESIDUAL);
        graph.setEdgeAttribute(edge, "size", 5);
      } else {
        graph.setEdgeAttribute(edge, "type", EdgeTypes.CURVED);
      }
    });
  };

  const hideResidualEdges = () => {
    graph.forEachEdge((edge) => {
      if (graph.getEdgeAttribute(edge, "isReverse")) {
        graph.setEdgeAttribute(edge, "hidden", true);
        graph.setEdgeAttribute(edge, "color", Colors.DEFAULT_EDGE);
        graph.setEdgeAttribute(edge, "size", 0);
      } else {
        //TODO: Osetrit pripad kdz jsou dve protichudne hranza obe jsou viditelne
        graph.setEdgeAttribute(edge, "type", EdgeTypes.STRAIGHT);
      }
    });
  };

  const generateResidualEdges = () => {
    console.log("Generating residual edges...");
    graph.forEachEdge((edge) => {
      const source = graph.source(edge);
      const target = graph.target(edge);
      const edgeAtts = graph.getEdgeAttributes(edge);
      const reverseEdge = graph.edge(target, source);

      if (!reverseEdge) {
        graph.addEdge(target, source, {
          flow: -edgeAtts.flow,
          capacity: 0,
          isReverse: true,
          hidden: true,
        });
        console.log("Reverse edge added:", target, source);
      }
    });
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
        showResidualEdges,
        hideResidualEdges,
        generateResidualEdges,
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
