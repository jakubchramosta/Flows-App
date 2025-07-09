import { useDrawDefaultGraph } from "../../hooks/useDrawDefaultGraph";
import { ButtonSizes, ButtonVariants, GraphTypes } from "../utils/consts.js";
import { Button } from "../ui/button.js";
import { InfoIcon, XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.js";
import { useGraphManagement } from "../../context/GraphManagementContext";
import { useTraining } from "../../context/TrainingContext";

interface BottomToolBarSegmentLeftProps {
  handleInfoClick: (e: any) => void;
  showInfo: boolean;
}

const BottomToolBarSegmentLeft = ({
  handleInfoClick,
  showInfo,
}: BottomToolBarSegmentLeftProps) => {
  const { graphs, activeGraph, clearGraph } = useGraphManagement();
  const { editationMode } = useTraining();

  return (
    <div id="left" className="flex justify-start w-full">
      <div className="flex items-center gap-4">
        <Button
          variant={ButtonVariants.OUTLINE}
          size={ButtonSizes.ICON}
          onClick={handleInfoClick}
          className="min-w-10"
        >
          {showInfo ? <XIcon /> : <InfoIcon />}
        </Button>
        {editationMode && (
          <Select
            onValueChange={(value) => {
              clearGraph();
              useDrawDefaultGraph(graphs[activeGraph], value);
            }}
          >
            <SelectTrigger className="w-full min-w-[210px]">
              <SelectValue placeholder="Zvol si graf pro vykreslení" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={GraphTypes.EXAMPLE}>
                {GraphTypes.EXAMPLE}
              </SelectItem>
              <SelectItem value={GraphTypes.SIMPLE_LINEAR}>
                {GraphTypes.SIMPLE_LINEAR}
              </SelectItem>
              <SelectItem value={GraphTypes.MANY_PATHS}>
                {GraphTypes.MANY_PATHS}
              </SelectItem>
              <SelectItem value={GraphTypes.CYCLE}>
                {GraphTypes.CYCLE}
              </SelectItem>
              <SelectItem value={GraphTypes.COMPLEX}>
                {GraphTypes.COMPLEX}
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default BottomToolBarSegmentLeft;
