import {
  ArrowLeftIcon,
  CheckIcon,
  PlusIcon,
  RotateCcwIcon,
} from "lucide-react";
import BottomToolBarButton from "../BottomToolBarButton.js";
import { ButtonSizes, ButtonVariants } from "../utils/consts.js";
import { useGraphManagement } from "../../context/GraphManagementContext";
import { useTraining } from "../../context/TrainingContext.js";
import { useTrainingOperations } from "../../hooks/useTrainingOperations.js";

const BottomToolBarSegmentMiddleTraining = () => {
  const { graphs, activeGraph } = useGraphManagement();
  const { addToPaths } = useTraining();
  const { removeLastFromPath, userPath, evaluateUserMaxFlow } = useTraining();
  const { resetGraphInTraining } = useTrainingOperations();

  const stepBack = () => {
    removeLastFromPath();
  };

  const addToUsersPath = () => {
    addToPaths();
  };

  const resetTraining = () => {
    resetGraphInTraining();
  };

  const evaluate = () => {
    evaluateUserMaxFlow();
  };

  return (
    <div id="middle" className="flex justify-center w-full">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-4">
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ROUNDED}
            icon={<ArrowLeftIcon />}
            tooltipText="Krok zpět"
            onClick={() => stepBack()}
            isDisabled={userPath.length < 2}
          />
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ROUNDED}
            icon={<PlusIcon />}
            tooltipText="Přidat cestu to toku"
            onClick={() => {
              addToUsersPath();
            }}
            isDisabled={graphs[activeGraph].snapshots.length != 0}
          />
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ROUNDED}
            icon={<RotateCcwIcon />}
            tooltipText="Restartovat trénink"
            onClick={() => resetTraining()}
            isDisabled={false}
          />
        </div>
        <BottomToolBarButton
          variant={ButtonVariants.OUTLINE}
          size={ButtonSizes.ROUNDED}
          icon={<CheckIcon />}
          tooltipText="Vyhodnotit"
          onClick={evaluate}
          isDisabled={false}
        />
      </div>
    </div>
  );
};

export default BottomToolBarSegmentMiddleTraining;
