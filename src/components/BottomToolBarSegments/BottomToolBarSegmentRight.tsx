import { useRef } from "react";
import { Button } from "../ui/button.js";
import { Trash2Icon } from "lucide-react";
import BottomToolBarButton from "../BottomToolBarButton.js";
import { ButtonSizes, ButtonVariants } from "../utils/consts.js";
import { useGraphManagement } from "../../context/GraphManagementContext";
import { useTraining } from "../../context/TrainingContext";
import { useGraphIO } from "../../hooks/useGraphIO";

const BottomToolBarSegmentRight = () => {
  const { deleteCurrentGraph } = useGraphManagement();
  const { editationMode } = useTraining();
  const { exportCurrentGraph, importGraph } = useGraphIO();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="right" className="flex w-full justify-end gap-4">
      {editationMode && (
        <>
          <Button
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.DEFAULT}
            onClick={exportCurrentGraph}
          >
            Export
          </Button>
          <Button
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.DEFAULT}
            onClick={handleImportClick}
          >
            Import
          </Button>
          <input
            type="file"
            accept=".json,application/json"
            onClick={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
            onChange={importGraph}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <BottomToolBarButton
            variant={ButtonVariants.OUTLINE}
            size={ButtonSizes.ICON}
            icon={<Trash2Icon />}
            tooltipText="Vymazat graf"
            onClick={deleteCurrentGraph}
            isDisabled={false}
          />
        </>
      )}
    </div>
  );
};

export default BottomToolBarSegmentRight;
