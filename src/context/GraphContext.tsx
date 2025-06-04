import { createContext, ReactNode, useContext } from "react";
import { NodesProvider } from "./NodesContext";
import { EdgesProvider } from "./EdgesContext";
import {
  GraphManagementProvider,
  useGraphManagement,
} from "./GraphManagementContext";
import { AlgorithmProvider } from "./AlgorithmContext";
import { SnapshotProvider } from "./SnapshotContext";
import { TrainingProvider } from "./TrainingContext";
import Graph from "graphology";

// Re-export types for backward compatibility
export type { GraphInfo } from "./GraphManagementContext";

interface GraphContextType {
  // Expose current graph for components that need direct access
  graph: Graph;
}

const GraphContext = createContext<GraphContextType>({} as GraphContextType);

const GraphContextProvider = ({ children }: { children: ReactNode }) => {
  const { currentGraph, updateGraphInfo } = useGraphManagement();

  return (
    <GraphContext.Provider
      value={{
        graph: currentGraph.graph,
      }}
    >
      <NodesProvider
        graph={currentGraph.graph}
        graphInfo={currentGraph}
        updateGraphInfo={updateGraphInfo}
      >
        <EdgesProvider graph={currentGraph.graph}>{children}</EdgesProvider>
      </NodesProvider>
    </GraphContext.Provider>
  );
};

export const GraphProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GraphManagementProvider>
      <AlgorithmProvider>
        <SnapshotProvider>
          <TrainingProvider>
            <GraphContextProvider>{children}</GraphContextProvider>
          </TrainingProvider>
        </SnapshotProvider>
      </AlgorithmProvider>
    </GraphManagementProvider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within GraphProvider");
  }
  return context;
};

export default GraphContext;
