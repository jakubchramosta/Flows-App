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
  const { userPath, setUserPath, updateUserPath, userTotalFlow } =
    useTraining();
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

  const addEdgeToUserPath = (edgeId: string) => {
    if (!edgeId) return;
    updateUserPath(edgeId);
  };

  useEffect(() => {
    resetGraph();
    if (editationMode === false) {
      setOptimalMaxFlow(calculateOptimalMaxFlow());
      setUserPath([currentGraph.source]);
      console.log("user path set to start: ", userPath);
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
