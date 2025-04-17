import { Button } from "./ui/button.js";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.js";
import GraphContext from "../context/GraphContext.js";
import { useContext } from "react";

const TabsSwitcher = () => {
  const { graphs, addGraph, setActiveGraphIndex, activeGraph } =
    useContext(GraphContext);

  return (
    <div className="absolute left-5 top-5 flex flex-row gap-3">
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
      <Button
        variant="outline"
        className="size-10"
        onClick={() => {
          addGraph();
        }}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default TabsSwitcher;
