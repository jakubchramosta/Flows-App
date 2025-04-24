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
  RefreshCcwIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";
import { TooltipProvider } from "./ui/tooltip.js";
import BottomToolBarButton from "./BottomToolBarButton.js";
import { ButtonSizes, ButtonVariants } from "./utils/consts.js";

interface BottomToolBarProps {
  handleInfoClick: (e: any) => void;
}

const BottomToolBar = ({ handleInfoClick }: BottomToolBarProps) => {
  const {
    graphs,
    activeGraph,
    clearGraph,
    calculateMaxFlow,
    resetGraph,
    navigatePath,
    resetPathNavigation,
  } = useContext(GraphContext);
  return (
    <TooltipProvider>
      <div className="absolute bottom-3 left-0 right-0 mx-3 flex items-center justify-between rounded-md border border-input bg-background p-2.5 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ICON}
            onClick={handleInfoClick}
          >
            <InfoIcon />
          </Button>
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ICON}
            icon={<NetworkIcon />}
            tooltipText="Vykreslit výchozí graf"
            onClick={() => {
              clearGraph();
              useDrawDefaultGraph(graphs[activeGraph]);
            }}
          />
        </div>
        <div className="flex items-center gap-12">
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ROUNDED}
            icon={<PlayIcon />}
            tooltipText="Spustit algoritmus"
            onClick={() => {
              calculateMaxFlow(graphs[activeGraph]);
            }}
          />
          <div className="flex items-center gap-4">
            <BottomToolBarButton
              variant={ButtonVariants.OUTLINE}
              size={ButtonSizes.ROUNDED}
              icon={<ArrowLeftIcon />}
              tooltipText="Předchozí krok"
              onClick={() => navigatePath("backward")}
            />
            <BottomToolBarButton
              variant={ButtonVariants.OUTLINE}
              size={ButtonSizes.ROUNDED}
              icon={<ArrowRightIcon />}
              tooltipText="Další krok"
              onClick={() => navigatePath("forward")}
            />
          </div>
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ROUNDED}
            icon={<RefreshCcwIcon />}
            tooltipText="Reset navidace"
            onClick={resetPathNavigation}
          />
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ROUNDED}
            icon={<RotateCcwIcon />}
            tooltipText="Obnovit graf"
            onClick={resetGraph}
          />
        </div>
        <BottomToolBarButton
          variant={ButtonVariants.OUTLINE}
          size={ButtonSizes.ICON}
          icon={<Trash2Icon />}
          tooltipText="Vymazat graf"
          onClick={clearGraph}
        />
      </div>
    </TooltipProvider>
  );
};
export default BottomToolBar;
