import { Button } from "./ui/button.js";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.js";

const GraphTabs = () => {
  return (
    <div className="absolute left-5 top-5 flex flex-row gap-3">
      <Tabs defaultValue="graph1">
        <TabsList>
          <TabsTrigger value="graph1">Graph 1</TabsTrigger>
        </TabsList>
      </Tabs>
      <Button variant={"outline"} size={"icon"}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default GraphTabs;
