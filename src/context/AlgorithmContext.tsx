import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "sonner";
import { Algorithms } from "../components/utils/consts";
import { useFordFulkerson } from "../hooks/useFordFulkerson";
import { useEdmondsKarp } from "../hooks/useEdmondsKarp";
import { GraphInfo } from "../context/GraphManagementContext";
import Graph from "graphology";

interface AlgorithmContextType {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (alg: string) => void;
  calculateMaxFlow: (graphInfo: GraphInfo, editationMode: boolean) => number;
  bfsCheckPath: (graph: Graph, source: string, sink: string) => boolean;
}

const AlgorithmContext = createContext<AlgorithmContextType>(
  {} as AlgorithmContextType,
);

export const AlgorithmProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("ford-fulkerson");

  const bfsCheckPath = (
    graph: Graph,
    source: string,
    sink: string,
  ): boolean => {
    const visited = new Set<string>();
    const queue: string[] = [source];

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      if (currentNode === sink) {
        return true;
      }

      visited.add(currentNode);

      graph.forEachNeighbor(currentNode, (neighbor) => {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      });
    }

    return false;
  };

  const calculateMaxFlow = (
    graphInfo: GraphInfo,
    editationMode: boolean,
  ): number => {
    if (
      !graphInfo.source ||
      !graphInfo.sink ||
      graphInfo.source === graphInfo.sink
    ) {
      toast.error("Nastavte ZDROJ a CÍL!");
      return 0;
    }

    const hasPath = bfsCheckPath(
      graphInfo.graph,
      graphInfo.source,
      graphInfo.sink,
    );
    if (!hasPath) {
      toast.error("Neexistuje žádná cesta mezi ZDROJEM a CÍLEM!");
      return 0;
    }

    let maxFlow = 0;

    switch (selectedAlgorithm) {
      case Algorithms.FORD_FULKERSON:
        toast.success("Používá se Ford-Fulkerson algoritmus.");
        maxFlow = useFordFulkerson(graphInfo);
        break;
      case Algorithms.EDMONDS_KARP:
        toast.success("Používá se Edmonds-Karp algoritmus.");
        maxFlow = useEdmondsKarp(graphInfo, editationMode);
        break;
      default:
        maxFlow = useFordFulkerson(graphInfo);
    }

    return maxFlow;
  };

  return (
    <AlgorithmContext.Provider
      value={{
        selectedAlgorithm,
        setSelectedAlgorithm,
        calculateMaxFlow,
        bfsCheckPath,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);
  if (!context) {
    throw new Error("useAlgorithm must be used within AlgorithmProvider");
  }
  return context;
};
