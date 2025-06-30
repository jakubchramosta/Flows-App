import { useGraph } from "../context/GraphContext";
import { useGraphManagement } from "../context/GraphManagementContext";
import { UserPath, useTraining } from "../context/TrainingContext";
import { useFordFulkerson } from "./useFordFulkerson";
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
    return useEdmondsKarp(currentGraph, false);
  };

  const isUserFlowOptimal = (): boolean => {
    const optimalFlow = calculateOptimalMaxFlow();
    return userTotalFlow >= optimalFlow;
  };

  const addEdgeToUserPath = (edgeId: string, isReverse: boolean) => {
    if (!edgeId) return;

    const edgeToAdd: UserPath = {
      path: [edgeId],
      flow: 0,
    };

    const newPath = [...userPath, edgeToAdd];
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
      // max flow se musi vypocitat az potom co se switchne editation mode
      setOptimalMaxFlow(calculateOptimalMaxFlow());
      console.log("Optimal max flow calculated:", optimalMaxFlow);
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
