import { Button } from "./ui/button.js";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.js";

const GraphTabs = () => {
  return (
    <div className="absolute left-5 top-5 flex flex-row gap-3">
      <Tabs defaultValue="graph1">
        <TabsList className="h-10">
          <TabsTrigger value="graph1">Graph 1</TabsTrigger>
          <TabsTrigger value="graph2">Graph 2</TabsTrigger>
        </TabsList>
      </Tabs>
      <Button variant="outline" className="size-10">
        <PlusIcon />
      </Button>
    </div>
  );
};

export default GraphTabs;
