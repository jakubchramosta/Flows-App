import { useGraph } from "../context/GraphContext";
import { useGraphManagement } from "../context/GraphManagementContext";
import { useTraining } from "../context/TrainingContext";
import {
  isValidAugmentingPath,
  calculatePathFlow,
} from "../lib/graphOperations";
import { useGraphOperations } from "./useGraphOperations";
import { useEdmondsKarp } from "./useEdmondsKarp";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Colors } from "../components/utils/consts";

export const useTrainingOperations = () => {
  const { graph } = useGraph();
  const { currentGraph } = useGraphManagement();
  const { userPath, setUserPath, userTotalFlow } = useTraining();
  const { resetGraph } = useGraphOperations();
  const { editationMode, setOptimalMaxFlow } = useTraining();

  const validateCurrentPath = (): boolean => {
    if (!graph || userPath.length < 2) return false;
    return isValidAugmentingPath(userPath, graph);
  };

  const calculateCurrentPathFlow = (): number => {
    if (!graph || !validateCurrentPath()) return 0;
    return calculatePathFlow(userPath, graph);
  };

  const calculateOptimalMaxFlow = (): number => {
    const calculatedFlow = useEdmondsKarp(currentGraph, false);
    console.log("Calculated optimal max flow:", calculatedFlow);
    return calculatedFlow;
  };

  const isUserFlowOptimal = (): boolean => {
    const optimalFlow = calculateOptimalMaxFlow();
    return userTotalFlow >= optimalFlow;
  };

  const addEdgeToUserPath = useCallback(
    (edgeId: string) => {
      if (!edgeId) return;

      console.log("Adding edge to user path:", edgeId);
      console.log("Current user path:", userPath); // ✅ Aktuální stav

      let source = currentGraph.graph.source(edgeId);
      let target = currentGraph.graph.target(edgeId);

      console.log("source:", source);
      console.log("zacatek", userPath[userPath.length - 1]); // ✅ Aktuální stav

      if (source !== userPath[userPath.length - 1]) {
        console.log(
          source,
          "is not the source node",
          userPath[userPath.length - 1],
        );
        toast.error(
          `Tata hrana nemůže být vzbrána, protože nezačíná od posledního uzlu v cestě (${userPath[userPath.length - 1]})`,
        );
        return;
      }

      const newPath = [...userPath, target]; // ✅ Aktuální stav
      console.log(`Edge ${edgeId} added to user path`);
      console.log("New user path:", newPath);

      setUserPath(newPath);
      graph.setEdgeAttribute(edgeId, "color", Colors.GREEN_EDGE);
    },
    [userPath, currentGraph.graph],
  );

  useEffect(() => {
    resetGraph();
    if (editationMode === false) {
      setOptimalMaxFlow(calculateOptimalMaxFlow());
      setUserPath([currentGraph.source]);
    }
  }, [editationMode]);

  return {
    validateCurrentPath,
    calculateCurrentPathFlow,
    calculateOptimalMaxFlow,
    isUserFlowOptimal,
    addEdgeToUserPath,
  };
};
