import { useGraph } from "../context/GraphContext";
import { useGraphManagement } from "../context/GraphManagementContext";
import { useTraining } from "../context/TrainingContext";
import { useFordFulkerson } from "./useFordFulkerson";
import { isValidAugmentingPath, calculatePathFlow } from "../lib/graphOperations";

export const useTrainingOperations = () => {
  const { graph } = useGraph();
  const { currentGraph } = useGraphManagement();
  const { userPath, userTotalFlow } = useTraining();

  const validateCurrentPath = (): boolean => {
    if (!graph || userPath.length < 2) return false;
    return isValidAugmentingPath(userPath, graph);
  };

  const calculateCurrentPathFlow = (): number => {
    if (!graph || !validateCurrentPath()) return 0;
    return calculatePathFlow(userPath, graph);
  };

  const calculateOptimalMaxFlow = (): number => {
    // Vytvořit kopii grafu pro výpočet optimálního řešení
    const graphCopy = graph.copy();
    const graphInfoCopy = {
      ...currentGraph,
      graph: graphCopy
    };
    
    return useFordFulkerson(graphInfoCopy);
  };

  const isUserFlowOptimal = (): boolean => {
    const optimalFlow = calculateOptimalMaxFlow();
    return userTotalFlow >= optimalFlow;
  };

  return {
    validateCurrentPath,
    calculateCurrentPathFlow,
    calculateOptimalMaxFlow,
    isUserFlowOptimal,
  };
};