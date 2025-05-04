import { useContext, useState } from "react";
import GraphContext from "../context/GraphContext.js";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";
import { Button } from "./ui/button.js";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InfoIcon,
  PlayIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";
import { TooltipProvider } from "./ui/tooltip.js";
import BottomToolBarButton from "./BottomToolBarButton.js";
import { ButtonSizes, ButtonVariants, GraphTypes } from "./utils/consts.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.js";

interface BottomToolBarProps {
  handleInfoClick: (e: any) => void;
  openSidebar: () => void;
}

const BottomToolBar = ({
  handleInfoClick,
  openSidebar,
}: BottomToolBarProps) => {
  const {
    graphs,
    activeGraph,
    clearGraph,
    calculateMaxFlow,
    resetGraph,
    currentSnapshotIndex,
    showPreviousSnapshot,
    showNextSnapshot,
    deleteCurrentGraph,
  } = useContext(GraphContext);
  const snapshots = graphs[activeGraph].snapshots;

  return (
    <TooltipProvider>
      <div className="absolute bottom-3 left-0 right-0 mx-3 flex min-w-fit items-center justify-between rounded-md border border-input bg-background p-2.5 shadow-sm">
        <div id="left" className="flex justify-start w-full">
          <div className="flex items-center gap-4">
            <Button
              variant={ButtonVariants.OUTLINE}
              size={ButtonSizes.ICON}
              onClick={handleInfoClick}
              className="min-w-10"
            >
              <InfoIcon />
            </Button>
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
          </div>
        </div>
        <div id="middle" className="flex justify-center w-full">
          <div className="flex items-center gap-12">
            <BottomToolBarButton
              variant={ButtonVariants.OUTLINE}
              size={ButtonSizes.ROUNDED}
              icon={<PlayIcon />}
              tooltipText="Spustit algoritmus"
              onClick={() => {
                calculateMaxFlow(graphs[activeGraph]);
                openSidebar();
              }}
              isDisabled={false}
            />
            <div className="flex items-center gap-4">
              <BottomToolBarButton
                variant={ButtonVariants.OUTLINE}
                size={ButtonSizes.ROUNDED}
                icon={<ArrowLeftIcon />}
                tooltipText="Předchozí krok"
                onClick={() => showPreviousSnapshot()}
                isDisabled={currentSnapshotIndex === 0}
              />
              <BottomToolBarButton
                variant={ButtonVariants.OUTLINE}
                size={ButtonSizes.ROUNDED}
                icon={<ArrowRightIcon />}
                tooltipText="Další krok"
                onClick={() => showNextSnapshot()}
                isDisabled={currentSnapshotIndex === snapshots.length - 1}
              />
            </div>
            <BottomToolBarButton
              variant={ButtonVariants.OUTLINE}
              size={ButtonSizes.ROUNDED}
              icon={<RotateCcwIcon />}
              tooltipText="Obnovit graf"
              onClick={resetGraph}
              isDisabled={false}
            />
          </div>
        </div>
        <div id="right" className="flex justify-end w-full">
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ICON}
            icon={<Trash2Icon />}
            tooltipText="Vymazat graf"
            onClick={deleteCurrentGraph}
            isDisabled={false}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};
export default BottomToolBar;
