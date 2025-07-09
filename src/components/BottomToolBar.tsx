import { TooltipProvider } from "./ui/tooltip.js";
import BottomToolBarSegmentLeft from "./BottomToolBarSegments/BottomToolBarSegmentLeft";
import BottomToolBarSegmentMiddle from "./BottomToolBarSegments/BottomToolBarSegmentMiddle";
import BottomToolBarSegmentRight from "./BottomToolBarSegments/BottomToolBarSegmentRight";
import { useTraining } from "../context/TrainingContext.js";
import BottomToolBarSegmentMiddleTraining from "./BottomToolBarSegments/BottomToolBarSegmentMiddleTraing.js";

interface BottomToolBarProps {
  handleInfoClick: (e: any) => void;
  openSidebar: () => void;
  showInfo: boolean;
}

const BottomToolBar = ({
  handleInfoClick,
  openSidebar,
  showInfo,
}: BottomToolBarProps) => {
  const { editationMode } = useTraining();

  return (
    <TooltipProvider>
      <div className="absolute bottom-3 left-0 right-0 mx-3 flex min-w-fit items-center justify-between rounded-md border border-input bg-background p-2.5 shadow-sm">
        <BottomToolBarSegmentLeft
          handleInfoClick={handleInfoClick}
          showInfo={showInfo}
        />
        {editationMode ? (
          <BottomToolBarSegmentMiddle openSidebar={openSidebar} />
        ) : (
          <BottomToolBarSegmentMiddleTraining />
        )}
        <BottomToolBarSegmentRight />
      </div>
    </TooltipProvider>
  );
};

export default BottomToolBar;
