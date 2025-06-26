import { useGraphManagement } from "../context/GraphManagementContext";
import TrainingSidebarRow from "./TrainingSidebarRow";

const TrainingSidebar = () => {
  const { currentGraph } = useGraphManagement();
  const currentMaxFlow = currentGraph.maxFlow;
  const discoveredPaths = currentGraph.paths;

  return (
    <div className="absolute right-5 top-5 flex w-[340px] flex-col gap-3">
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
            <TrainingSidebarRow key={index} path={path} label={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingSidebar;
