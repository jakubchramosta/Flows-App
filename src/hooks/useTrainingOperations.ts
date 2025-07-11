import { useGraph } from "../context/GraphContext";
import { useGraphManagement } from "../context/GraphManagementContext";
import { useTraining } from "../context/TrainingContext";
import {
  isValidAugmentingPath,
  calculatePathFlow,
} from "../lib/graphOperations";
import { useGraphOperations } from "./useGraphOperations";
import { useEdmondsKarp } from "./useEdmondsKarp";
import { useEffect } from "react";
import { useEdges } from "../context/EdgesContext";
import { updateEdgeLabels } from "../lib/graphEdgeOperations";

export const useTrainingOperations = () => {
  const { graph } = useGraph();
  const { currentGraph } = useGraphManagement();
  const { userPath, setUserPath, updateUserPath, userTotalFlow } =
    useTraining();
  const { resetGraph } = useGraphOperations();
  const { editationMode, setOptimalMaxFlow, setUserTotalFlow } = useTraining();
  const { generateResidualEdges } = useEdges();

  const validateCurrentPath = (): boolean => {
    if (!graph || userPath.length < 2) return false;
    return isValidAugmentingPath(userPath, currentGraph);
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

  const resetGraphInTraining = () => {
    resetGraph();
    if (editationMode === false) {
      setOptimalMaxFlow(calculateOptimalMaxFlow());
      resetGraph();
      generateResidualEdges();
      updateEdgeLabels(currentGraph.graph);
      setUserPath([currentGraph.source]);
      setUserTotalFlow(0);
    }
    console.log("Graph reset in training mode");
    // console.log("Current graph:", currentGraph);
  };

  useEffect(() => {
    resetGraphInTraining();
  }, [editationMode]);

  return {
    validateCurrentPath,
    calculateCurrentPathFlow,
    calculateOptimalMaxFlow,
    isUserFlowOptimal,
    addEdgeToUserPath,
    resetGraphInTraining,
  };
};
