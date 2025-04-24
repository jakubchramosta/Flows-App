import { ArrowRight } from "lucide-react";
import SquareWrapper from "./SquareWrapper";
import React from "react";

interface AlgProgressRowProps {
  path: {
    path: string[];
    flow: number;
  };
  label: number;
}

const AlgProgressRow: React.FC<AlgProgressRowProps> = ({ path, label }) => {
  return (
    <div className="flex items-center justify-between gap-1">
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
      <div className="grid w-5 h-5 p-3 text-base border rounded-full shadow-sm place-content-center border-input bg-background">
        <p className="font-bold">{path.flow}</p>
      </div>
    </div>
  );
};

export default AlgProgressRow;
