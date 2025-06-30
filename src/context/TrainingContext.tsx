import { createContext, ReactNode, useContext, useState } from "react";

interface TrainingContextType {
  editationMode: boolean;
  switchEditMode: () => void;
  userPath: UserPath[];
  setUserPath: (path: UserPath[]) => void;
  clearUserPath: () => void;
  userTotalFlow: number;
}

export interface UserPath {
  path: string[];
  flow: number;
}

const TrainingContext = createContext<TrainingContextType>(
  {} as TrainingContextType,
);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [editationMode, setEditationMode] = useState(true);
  const [userPath, setUserPath] = useState<UserPath[]>([]);
  const [userTotalFlow, setUserTotalFlow] = useState(0);

  const switchEditMode = () => {
    setEditationMode((prev) => !prev);
  };

  const clearUserPath = () => {
    setUserPath([]);
  };

  return (
    <TrainingContext.Provider
      value={{
        editationMode,
        switchEditMode,
        userPath,
        setUserPath,
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
