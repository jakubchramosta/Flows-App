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
      <p>{label}</p>
      <div className="flex items-center gap-x-0.5">
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
      <div className="grid h-5 w-5 place-content-center rounded-full border border-input bg-background text-sm shadow-sm">
        <p>{path.flow}</p>
      </div>
    </div>
  );
};

export default AlgProgressRow;
