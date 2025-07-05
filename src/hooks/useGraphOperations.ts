import { Colors } from "../components/utils/consts";
import { useGraphManagement } from "../context/GraphManagementContext";
import { useAlgorithm } from "../context/AlgorithmContext";
import { useSnapshot } from "../context/SnapshotContext";

export const useGraphOperations = () => {
  const { currentGraph, updateGraphInfo } = useGraphManagement();
  const { calculateMaxFlow } = useAlgorithm();
  const { showSelectedSnapshot } = useSnapshot();

  const addToPaths = (newPath: string[], itsFlow: number) => {
    const newPaths = [...currentGraph.paths, { path: newPath, flow: itsFlow }];
    updateGraphInfo({ paths: newPaths });
  };

  const resetGraph = () => {
    currentGraph.graph.forEachEdge((edge) => {
      currentGraph.graph.setEdgeAttribute(edge, "flow", 0);
      if (!currentGraph.graph.getEdgeAttribute(edge, "isResidual")) {
        currentGraph.graph.setEdgeAttribute(edge, "color", Colors.DEFAULT_EDGE);
      }
    });

    updateGraphInfo({
      maxFlow: 0,
      paths: [],
      snapshots: [],
    });

    updateEdgeLabels();
  };

  const updateEdgeLabels = () => {
    currentGraph.graph.forEachEdge((edge) => {
      const flow = currentGraph.graph.getEdgeAttribute(edge, "flow");
      const capacity = currentGraph.graph.getEdgeAttribute(edge, "capacity");
      currentGraph.graph.setEdgeAttribute(edge, "label", `${flow}/${capacity}`);
    });
  };

  const calculateAndUpdateMaxFlow = () => {
    const maxFlow = calculateMaxFlow(currentGraph, false);
    updateGraphInfo({ maxFlow });
    const lastIndex = currentGraph.snapshots.length - 1;
    if (lastIndex >= 0) {
      showSelectedSnapshot(lastIndex);
    }

    updateEdgeLabels();
  };

  return {
    addToPaths,
    resetGraph,
    updateEdgeLabels,
    calculateAndUpdateMaxFlow,
  };
};
