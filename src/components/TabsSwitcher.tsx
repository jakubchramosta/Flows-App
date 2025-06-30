import { Button } from "./ui/button.js";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.js";
import { useGraphManagement } from "../context/GraphManagementContext";
import { useTraining } from "../context/TrainingContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.js";
import { useAlgorithm } from "../context/AlgorithmContext.js";

const TabsSwitcher = () => {
  const { graphs, addGraph, setActiveGraphIndex, activeGraph, currentGraph } =
    useGraphManagement();
  const { editationMode, switchEditMode } = useTraining();
  const { checkForSourceAndSink } = useAlgorithm();

  //resetne se graf, prob2hne kontrola jestli je graf validni a vypocita se max flow

  const handleSwitchEditMode = () => {
    if (!checkForSourceAndSink(currentGraph)) {
      return;
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
                disabled={!editationMode}
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
                disabled={!editationMode}
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
