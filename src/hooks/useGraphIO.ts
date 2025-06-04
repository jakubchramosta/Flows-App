import Graph from "graphology";
import { toast } from "sonner";
import {
  useGraphManagement,
  GraphInfo,
} from "../context/GraphManagementContext";

export const useGraphIO = () => {
  const { currentGraph, addGraph } = useGraphManagement();

  const exportCurrentGraph = () => {
    const exportableData = {
      graph: currentGraph.graph.export(),
      source: currentGraph.source,
      sink: currentGraph.sink,
    };

    const jsonStr = JSON.stringify(exportableData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "my-graph.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const importGraph = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const importedGraph: GraphInfo = {
          graph: Graph.from(json.graph),
          source: json.source,
          sink: json.sink,
          maxFlow: 0,
          paths: [],
          snapshots: [],
        };
        addGraph(importedGraph);
        toast.success("Graf byl úspěšně importován!");
      } catch (err) {
        toast.error("Soubor není validní JSON.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return {
    exportCurrentGraph,
    importGraph,
  };
};
