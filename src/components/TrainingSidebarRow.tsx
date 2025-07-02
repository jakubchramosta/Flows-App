import React from "react";
import SquareWrapper from "./SquareWrapper";
import { ArrowRight } from "lucide-react";

interface TrainingSidebarRowProps {
  path: {
    path: string[];
    flow: number;
  };
  label: number;
}

const TrainingSidebarRow: React.FC<TrainingSidebarRowProps> = ({
  path,
  label,
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <p>{label} &#41;</p>
        <div className="flex flex-wrap items-center gap-x-0.5 gap-y-0.5">
          {path.path.map((node, index) => (
            <React.Fragment key={index}>
              <SquareWrapper>
                <p>{node}</p>
              </SquareWrapper>
              {index < path.path.length - 1 && <ArrowRight size={14} />}
            </React.Fragment>
          ))}
        </div>
        <p className="font-bold">=</p>
        <div className="grid h-5 w-5 place-content-center rounded-full border border-input bg-background p-3 text-base shadow-sm">
          <p className="font-bold">{path.flow}</p>
        </div>
      </div>
    </>
  );
};

export default TrainingSidebarRow;
