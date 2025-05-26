import { Button } from "./ui/button.js";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.js";
import GraphContext from "../context/GraphContext.js";
import { useContext } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.js";
import { Switch } from "./ui/switch.js";

const TabsSwitcher = () => {
  const {
    graphs,
    addGraph,
    setActiveGraphIndex,
    activeGraph,
    editationMode,
    switchEditMode,
  } = useContext(GraphContext);

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
      <div className="flex items-center gap-2">
        <Switch checked={editationMode} onCheckedChange={switchEditMode} />
        <p>Editace {editationMode ? "ON" : "OFF"}</p>
      </div>
    </div>
  );
};

export default TabsSwitcher;
