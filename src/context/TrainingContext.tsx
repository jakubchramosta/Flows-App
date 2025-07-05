import { Colors } from "../components/utils/consts";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";
import { useGraphManagement } from "./GraphManagementContext";
import {
  isValidAugmentingPath,
  calculatePathFlow,
} from "../lib/graphOperations";
import {
  resetEdgeColors,
  updateEdgeLabels,
  updateEdgesFlow,
} from "../lib/graphEdgeOperations";

interface TrainingContextType {
  editationMode: boolean;
  switchEditMode: () => void;
  userPath: string[];
  setUserPath: (path: string[]) => void;
  userTotalFlow: number;
  setUserTotalFlow: (flow: number) => void;
  optimalMaxFlow: number;
  setOptimalMaxFlow: (flow: number) => void;
  updateUserPath: (edgeId: string) => void;
  removeLastFromPath: () => void;
  addToPaths: () => void;
}

const TrainingContext = createContext<TrainingContextType>(
  {} as TrainingContextType,
);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [editationMode, setEditationMode] = useState(true);
  const [userPath, setUserPath] = useState<string[]>([]);
  const [userTotalFlow, setUserTotalFlow] = useState(0);
  const [optimalMaxFlow, setOptimalMaxFlow] = useState(0);
  const { currentGraph } = useGraphManagement();

  const switchEditMode = () => {
    setEditationMode((prev) => !prev);
  };

  const updateUserPath = (edgeId: string) => {
    setUserPath((prevPath) => {
      console.log("Previous path:", prevPath);
      console.log("Adding edge to path:", edgeId);

      const source = currentGraph.graph.source(edgeId);
      const target = currentGraph.graph.target(edgeId);

      if (source !== prevPath[prevPath.length - 1]) {
        toast.error(
          `Tato hrana nemůže být vybrána, protože nezačíná od posledního uzlu v cestě (${prevPath[prevPath.length - 1]})`,
        );
        return prevPath; // Vrátíme nezměněný stav
      }

      const newPath = [...prevPath, target];

      console.log("New path after adding edge:", newPath);

      currentGraph.graph.setEdgeAttribute(edgeId, "color", Colors.GREEN_EDGE);

      return newPath;
    });
  };

  const removeLastFromPath = useCallback(() => {
    setUserPath((prevPath) => {
      if (prevPath.length === 1) {
        return prevPath; // Pokud je pouze start, vrátíme ho
      }
      currentGraph.graph.setEdgeAttribute(
        currentGraph.graph.edge(
          prevPath[prevPath.length - 2],
          prevPath[prevPath.length - 1],
        ),
        "color",
        Colors.DEFAULT_EDGE,
      );

      const newPath = prevPath.slice(0, -1);
      console.log("Removing last from path:", newPath);
      return newPath;
    });
  }, []);

  const addToPaths = () => {
    if (!isValidAugmentingPath(userPath, currentGraph)) {
      console.log("Invalid path:", userPath);
      console.log("Used graph:", currentGraph);
      toast.error("Cesta není platná, zkontrolujte ji prosím.");
      return;
    }
    console.log("Adding path to paths:", userPath);

    const pathFlow = calculatePathFlow(userPath, currentGraph.graph);
    if (pathFlow <= 0) {
      toast.error("Cesta nemá žádný tok, vuberte jinou cestu.");
      return;
    }

    currentGraph.paths.push({ path: userPath, flow: pathFlow });
    updateEdgesFlow(currentGraph.graph, pathFlow, userPath);
    resetEdgeColors(currentGraph.graph);
    updateEdgeLabels(currentGraph.graph);
    setUserPath([currentGraph.source]);
    setUserTotalFlow((prev) => prev + pathFlow);
    console.log("----Path added to paths----");
  };

  return (
    <TrainingContext.Provider
      value={{
        editationMode,
        switchEditMode,
        userPath,
        setUserPath,
        userTotalFlow,
        setUserTotalFlow,
        optimalMaxFlow,
        setOptimalMaxFlow,
        updateUserPath,
        removeLastFromPath,
        addToPaths,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error("useTraining must be used within TrainingProvider");
  }
  return context;
};
