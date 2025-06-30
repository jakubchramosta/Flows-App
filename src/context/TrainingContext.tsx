import { createContext, ReactNode, useContext, useState } from "react";

interface TrainingContextType {
  editationMode: boolean;
  switchEditMode: () => void;
  userPath: string[];
  setUserPath: (path: string[]) => void;
  userTotalFlow: number;
  optimalMaxFlow: number;
  setOptimalMaxFlow: (flow: number) => void;
}

const TrainingContext = createContext<TrainingContextType>(
  {} as TrainingContextType,
);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [editationMode, setEditationMode] = useState(true);
  const [userPath, setUserPath] = useState<string[]>([]);
  const [userTotalFlow, setUserTotalFlow] = useState(0);
  const [optimalMaxFlow, setOptimalMaxFlow] = useState(0);

  const switchEditMode = () => {
    setEditationMode((prev) => !prev);
  };

  return (
    <TrainingContext.Provider
      value={{
        editationMode,
        switchEditMode,
        userPath,
        setUserPath,
        userTotalFlow,
        optimalMaxFlow,
        setOptimalMaxFlow,
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
