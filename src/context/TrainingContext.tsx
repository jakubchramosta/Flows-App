import { createContext, ReactNode, useContext, useState } from "react";

interface TrainingContextType {
  editationMode: boolean;
  switchEditMode: () => void;
  addEdgeToUserPath: (edgeId: string, isReverse: boolean) => void;
  userPath: string[];
  clearUserPath: () => void;
  userTotalFlow: number;
}

const TrainingContext = createContext<TrainingContextType>(
  {} as TrainingContextType,
);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [editationMode, setEditationMode] = useState(true);
  const [userPath, setUserPath] = useState<string[]>([]);
  const [userTotalFlow, setUserTotalFlow] = useState(0);

  const switchEditMode = () => {
    if (editationMode) {
      clearUserPath();
    }
    setEditationMode((prev) => !prev);
  };

  const addEdgeToUserPath = (edgeId: string, isReverse: boolean) => {
    if (!edgeId) return;

    setUserPath((prev) => {
      const newPath = [...prev, edgeId];
      console.log(
        `Edge ${edgeId} ${isReverse ? "reversed" : "added"} to user path`,
        newPath, // ✅ Správný nový stav
      );
      console.log("Current user path:", newPath); // ✅ Správný nový stav
      return newPath;
    });
  };

  const clearUserPath = () => {
    setUserPath([]);
  };

  return (
    <TrainingContext.Provider
      value={{
        editationMode,
        switchEditMode,
        addEdgeToUserPath,
        userPath,
        clearUserPath,
        userTotalFlow,
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
