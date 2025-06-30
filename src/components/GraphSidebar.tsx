import { useGraphManagement } from "../context/GraphManagementContext";
import { useAlgorithm } from "../context/AlgorithmContext";
import { useSnapshot } from "../context/SnapshotContext";
import AlgProgressRow from "./AlgProgressRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Algorithms } from "./utils/consts";
import { useGraphOperations } from "../hooks/useGraphOperations";

interface GraphSidebarProps {
  isVisible: boolean;
}

const GraphSidebar: React.FC<GraphSidebarProps> = ({ isVisible }) => {
  const { graphs, activeGraph } = useGraphManagement();
  const { setSelectedAlgorithm } = useAlgorithm();
  const { currentSnapshotIndex } = useSnapshot();
  const { resetGraph } = useGraphOperations();

  const currentMaxFlow = graphs[activeGraph].maxFlow;
  const discoveredPaths = graphs[activeGraph].paths;

  if (!isVisible) return null;

  return (
    <div className="absolute right-5 top-5 flex w-[340px] flex-col gap-3">
      <Select
        onValueChange={(value) => {
          setSelectedAlgorithm(value);
          resetGraph();
        }}
      >
        <SelectTrigger className="w-full max-w-[290px] bg-background">
          <SelectValue placeholder="Zvolit algoritmus" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Algorithms.FORD_FULKERSON}>
            Ford-Fulkerson
          </SelectItem>
          <SelectItem value={Algorithms.EDMONDS_KARP}>Edmonds-Karp</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center justify-center rounded-md border border-input bg-background p-2.5 px-3 shadow-sm">
        <div className="flex justify-start w-full gap-2">
          <h1>Maximální tok</h1>
        </div>
        <div className="flex justify-center w-full">
          <p className="my-1 text-2xl font-bold text-center">
            {currentMaxFlow}
          </p>
        </div>
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
