import { useGraph } from "../context/GraphContext";
import { useGraphManagement } from "../context/GraphManagementContext";
import { UserPath, useTraining } from "../context/TrainingContext";
import {
  isValidAugmentingPath,
  calculatePathFlow,
} from "../lib/graphOperations";
import { useAlgorithm } from "../context/AlgorithmContext";
import { useGraphOperations } from "./useGraphOperations";
import { useEdmondsKarp } from "./useEdmondsKarp";
import { useEffect } from "react";

export const useTrainingOperations = () => {
  const { graph } = useGraph();
  const { currentGraph } = useGraphManagement();
  const { userPath, setUserPath, userTotalFlow } = useTraining();
  const { resetGraph } = useGraphOperations();
  const { checkForSourceAndSink } = useAlgorithm();
  const { editationMode, switchEditMode, optimalMaxFlow, setOptimalMaxFlow } =
    useTraining();

  const validateCurrentPath = (): boolean => {
    if (!graph || userPath.length < 2) return false;
    return isValidAugmentingPath(userPath[userPath.length - 1].path, graph);
  };

  const calculateCurrentPathFlow = (): number => {
    if (!graph || !validateCurrentPath()) return 0;
    return calculatePathFlow(userPath[userPath.length - 1].path, graph);
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

  //TODO: dodat logiku pridavani hran
  const addEdgeToUserPath = (edgeId: string, isReverse: boolean) => {
    if (!edgeId) return;
    const edgeAttributes = currentGraph.graph.getEdgeAttributes(edgeId);

    const pathToAdd: UserPath = {
      path: [edgeId],
      flow: 0,
    };

    const newPath = [...userPath, pathToAdd];
    console.log(
      `Edge ${edgeId} ${isReverse ? "reversed" : "added"} to user path`,
      newPath,
    );
    console.log("Current user path:", newPath);

    setUserPath(newPath);
  };

  const prepareTraining = () => {
    if (!checkForSourceAndSink(currentGraph)) {
      return;
    }
    switchEditMode();
  };

  useEffect(() => {
    resetGraph();
    if (editationMode === false) {
      setOptimalMaxFlow(calculateOptimalMaxFlow());
    }
  }, [editationMode]);

  return {
    validateCurrentPath,
    calculateCurrentPathFlow,
    calculateOptimalMaxFlow,
    isUserFlowOptimal,
    addEdgeToUserPath,
    prepareTraining,
  };
};
