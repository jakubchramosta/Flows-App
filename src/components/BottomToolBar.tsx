import { useContext } from "react";
import GraphContext from "../context/GraphContext.js";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";
import { Button } from "./ui/button.js";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InfoIcon,
  NetworkIcon,
  PlayIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";

interface BottomToolBarProps {
  handleInfoClick: (e: any) => void;
}

const BottomToolBar = ({ handleInfoClick }: BottomToolBarProps) => {
  const { graphs, activeGraph, clearGraph, calculateMaxFlow } =
    useContext(GraphContext);
  return (
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md border border-input bg-background p-2.5 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant={"outline"} size={"icon"} onClick={handleInfoClick}>
          <InfoIcon />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            clearGraph();
            useDrawDefaultGraph(graphs[activeGraph]);
          }}
        >
          <NetworkIcon />
        </Button>
      </div>
      <div className="flex items-center gap-12">
        <Button
          variant={"outline"}
          size={"rounded"}
          onClick={() => {
            calculateMaxFlow(graphs[activeGraph]);
          }}
        >
          <PlayIcon />
        </Button>
        <div className="flex items-center gap-4">
          <Button variant={"outline"} size={"rounded"}>
            <ArrowLeftIcon />
          </Button>
          <Button variant={"outline"} size={"rounded"}>
            <ArrowRightIcon />
          </Button>
        </div>
        <Button variant={"outline"} size={"rounded"}>
          <RotateCcwIcon />
        </Button>
      </div>
      <Button variant={"outline"} size={"icon"} onClick={clearGraph}>
        <Trash2Icon />
      </Button>
    </div>
  );
};
export default BottomToolBar;
