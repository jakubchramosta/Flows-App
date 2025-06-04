import { createContext, ReactNode, useContext, useState } from "react";
import { useGraphManagement } from "./GraphManagementContext";

interface SnapshotContextType {
  currentSnapshotIndex: number;
  showPreviousSnapshot: () => void;
  showNextSnapshot: () => void;
  showSelectedSnapshot: (index: number) => void;
  setToLastSnapshot: () => void;
}

const SnapshotContext = createContext<SnapshotContextType>(
  {} as SnapshotContextType,
);

export const SnapshotProvider = ({ children }: { children: ReactNode }) => {
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState<number>(0);
  const { graphs, activeGraph, updateGraphInfo } = useGraphManagement();

  const switchGraphForSnapshot = (index: number) => {
    const snapshot = graphs[activeGraph].snapshots[index];
    if (snapshot) {
      updateGraphInfo({ graph: snapshot });
    }
  };

  const showPreviousSnapshot = () => {
    if (currentSnapshotIndex > 0) {
      setCurrentSnapshotIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        switchGraphForSnapshot(newIndex);
        return newIndex;
      });
    }
  };

  const showNextSnapshot = () => {
    if (currentSnapshotIndex < graphs[activeGraph].snapshots.length - 1) {
      setCurrentSnapshotIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        switchGraphForSnapshot(newIndex);
        return newIndex;
      });
    }
  };

  const showSelectedSnapshot = (index: number) => {
    if (index >= 0 && index < graphs[activeGraph].snapshots.length) {
      setCurrentSnapshotIndex(index);
      switchGraphForSnapshot(index);
    }
  };

  const setToLastSnapshot = () => {
    const lastIndex = graphs[activeGraph].snapshots.length - 1;
    if (lastIndex >= 0) {
      setCurrentSnapshotIndex(lastIndex);
      switchGraphForSnapshot(lastIndex);
    }
  };

  return (
    <SnapshotContext.Provider
      value={{
        currentSnapshotIndex,
        showPreviousSnapshot,
        showNextSnapshot,
        showSelectedSnapshot,
        setToLastSnapshot,
      }}
    >
      {children}
    </SnapshotContext.Provider>
  );
};

export const useSnapshot = () => {
  const context = useContext(SnapshotContext);
  if (!context) {
    throw new Error("useSnapshot must be used within SnapshotProvider");
  }
  return context;
};
