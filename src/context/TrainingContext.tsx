import { createContext, ReactNode, useContext, useState } from "react";

interface TrainingContextType {
  editationMode: boolean;
  switchEditMode: () => void;
  addEdgeToUserPath: (edgeId: string, isReverse: boolean) => void;
  userPath: string[];
  clearUserPath: () => void;
}

const TrainingContext = createContext<TrainingContextType>(
  {} as TrainingContextType,
);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [editationMode, setEditationMode] = useState(true);
  const [userPath, setUserPath] = useState<string[]>([]);

  const switchEditMode = () => {
    if (editationMode) {
      setUserPath([]);
    }
    setEditationMode((prev) => !prev);
  };

  const addEdgeToUserPath = (edgeId: string, isReverse: boolean) => {
    if (!edgeId) return;
    setUserPath((prev) => [...prev, edgeId]);
    console.log(
      `Edge ${edgeId} ${isReverse ? "reversed" : "added"} to user path`,
      userPath,
    );
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
