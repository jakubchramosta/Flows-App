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
import { Algorithms } from "./utils/consts";

interface GraphSidebarProps {
  isVisible: boolean;
}

const GraphSidebar: React.FC<GraphSidebarProps> = ({ isVisible }) => {
  const { graphs, activeGraph, setSelectedAlgorithm, currentSnapshotIndex } =
    useContext(GraphContext);
  const currentMaxFlow = graphs[activeGraph].maxFlow;
  const discoveredPaths = graphs[activeGraph].paths;

  if (!isVisible) return null;

  return (
    <div className="absolute right-5 top-5 flex w-[340px] flex-col gap-3">
      <Select onValueChange={(value) => setSelectedAlgorithm(value)}>
        <SelectTrigger className="w-full max-w-[290px] bg-background">
          <SelectValue placeholder="Zvolit algoritmus" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Algorithms.FORD_FULKERSON}>
            Ford-Fulkerson
          </SelectItem>
          <SelectItem value={Algorithms.EDMONDS_KARP}>Edmonds-Karp</SelectItem>
          {/* <SelectItem value="test3">Dinic's algoritmus</SelectItem> */}
        </SelectContent>
      </Select>
      <div className="rounded-md border border-input bg-background p-2.5 px-3 shadow-sm">
        <h1>Maximální tok</h1>
        <p className="my-1 text-2xl font-bold text-center">{currentMaxFlow}</p>
      </div>
      <div className="rounded-md border border-input bg-background p-2.5 shadow-sm">
        <h1 className="pb-2">Postup algoritmu</h1>
        <div className="flex flex-col gap-1">
          {discoveredPaths.map((path, index) => (
            <AlgProgressRow
              key={index}
              path={path}
              label={index + 1}
              isActive={index === currentSnapshotIndex}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphSidebar;
