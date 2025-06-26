import { Button } from "./ui/button.js";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.js";
import { useGraphManagement } from "../context/GraphManagementContext";
import { useTraining } from "../context/TrainingContext";
import { useGraphOperations } from "../hooks/useGraphOperations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.js";

const TabsSwitcher = () => {
  const { graphs, addGraph, setActiveGraphIndex, activeGraph } =
    useGraphManagement();
  const { editationMode, switchEditMode } = useTraining();
  const { resetGraph } = useGraphOperations();

  const handleSwitchEditMode = () => {
    if (editationMode) {
      resetGraph();
      console.log("Graph " + activeGraph + " has been reset.");
    }
    switchEditMode();
  };

  return (
    <div className="absolute flex flex-col gap-3 left-5 top-5">
      <div className="flex flex-row gap-2">
        <Tabs
          defaultValue={activeGraph.toString()}
          value={activeGraph.toString()}
        >
          <TabsList className="h-10">
            {graphs.map((_, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                onClick={() => setActiveGraphIndex(index)}
              >
                {`Graf ${index + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="size-10"
                onClick={() => {
                  addGraph();
                }}
              >
                <PlusIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-md border border-input bg-white p-2.5 text-black shadow-sm">
              Přidat graf
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center">
        <Button variant="outline" onClick={handleSwitchEditMode}>
          <p>{editationMode ? "Trénink" : "Editace"}</p>
        </Button>
      </div>
    </div>
  );
};

export default TabsSwitcher;
