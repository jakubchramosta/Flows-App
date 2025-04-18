import GraphContext from "../context/GraphContext";
import AlgProgressRow from "./AlgProgressRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useContext } from "react";

const GraphSidebar = () => {
  const { graphs, activeGraph } = useContext(GraphContext);
  const currentMaxFlow = graphs[activeGraph].maxFlow;
  const discoveredPaths = graphs[activeGraph].paths;

  return (
    <div className="absolute right-5 top-5 flex flex-col gap-4">
      <Select>
        <SelectTrigger className="w-full bg-background">
          <SelectValue placeholder="Zvolit algoritmus" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test1">Ford-Fullkerson algoritmus</SelectItem>
          <SelectItem value="test2">Edmonds-Karp algoritmus</SelectItem>
          <SelectItem value="test3">Dinic's algoritmus</SelectItem>
        </SelectContent>
      </Select>
      <div className="rounded-md border border-input bg-background p-2.5 px-3 shadow-sm">
        <h1>Maximální tok</h1>
        <p className="my-1 text-center text-2xl font-bold">{currentMaxFlow}</p>
      </div>
      <div className="rounded-md border border-input bg-background p-2.5 shadow-sm">
        <h1 className="pb-2">Postup algoritmu</h1>
        <div className="flex flex-col gap-1">
          {discoveredPaths.map((path, index) => (
            <AlgProgressRow key={index} path={path} label={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphSidebar;
