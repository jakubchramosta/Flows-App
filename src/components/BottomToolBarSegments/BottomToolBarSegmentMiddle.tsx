import { Button } from "../ui/button.js";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  RotateCcwIcon,
} from "lucide-react";
import BottomToolBarButton from "../BottomToolBarButton.js";
import { ButtonSizes, ButtonVariants } from "../utils/consts.js";
import { useGraphManagement } from "../../context/GraphManagementContext";
import { useSnapshot } from "../../context/SnapshotContext";
import { useGraphOperations } from "../../hooks/useGraphOperations";

interface BottomToolBarSegmentMiddleProps {
  openSidebar: () => void;
}

const BottomToolBarSegmentMiddle = ({
  openSidebar,
}: BottomToolBarSegmentMiddleProps) => {
  const { graphs, activeGraph } = useGraphManagement();
  const { currentSnapshotIndex, showPreviousSnapshot, showNextSnapshot } =
    useSnapshot();
  const { calculateAndUpdateMaxFlow, resetGraph } = useGraphOperations();

  const snapshots = graphs[activeGraph].snapshots;

  return (
    <div id="middle" className="flex justify-center w-full">
      <div className="flex items-center gap-12">
        <BottomToolBarButton
          variant={ButtonVariants.OUTLINE}
          size={ButtonSizes.ROUNDED}
          icon={<PlayIcon />}
          tooltipText="Spustit algoritmus"
          onClick={() => {
            calculateAndUpdateMaxFlow();
            openSidebar();
          }}
          isDisabled={graphs[activeGraph].snapshots.length != 0}
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
            isDisabled={
              currentSnapshotIndex === snapshots.length - 1 ||
              snapshots.length === 0
            }
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
  );
};

export default BottomToolBarSegmentMiddle;
