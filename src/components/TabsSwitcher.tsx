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

const TabsSwitcher = () => {
  const { graphs, addGraph, setActiveGraphIndex, activeGraph } =
    useContext(GraphContext);

  return (
    <div className="absolute flex flex-row gap-3 left-5 top-5">
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
  );
};

export default TabsSwitcher;
