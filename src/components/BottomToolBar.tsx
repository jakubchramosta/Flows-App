import { Button } from "../components/ui/button.js";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InfoIcon,
  NetworkIcon,
  PlayIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";

const BottomToolBar = () => {
  return (
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md border border-input bg-background p-2.5 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant={"outline"} size={"icon"}>
          <InfoIcon />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <NetworkIcon />
        </Button>
      </div>
      <div className="flex items-center gap-12">
        <Button variant={"outline"} size={"rounded"}>
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
      <Button variant={"outline"} size={"icon"}>
        <Trash2Icon />
      </Button>
    </div>
  );
};
export default BottomToolBar;
