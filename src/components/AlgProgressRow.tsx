import { ArrowRight } from "lucide-react";
import SquareWrapper from "./SquareWrapper";
import React from "react";

interface AlgProgressRowProps {
  path: string[];
  label: number;
}

const AlgProgressRow: React.FC<AlgProgressRowProps> = ({ path, label }) => {
  return (
    <div className="flex items-center justify-between gap-1">
      <p>{label}</p>
      <div className="flex items-center gap-x-0.5">
        {path.map((node, index) => (
          <React.Fragment key={index}>
            <SquareWrapper>
              <p>{node}</p>
            </SquareWrapper>
            {index < path.length - 1 && <ArrowRight size={14} />}
          </React.Fragment>
        ))}
      </div>
      <p className="font-bold">=</p>
      <div className="grid w-5 h-5 text-sm border rounded-full shadow-sm place-content-center border-input bg-background">
        <p>{path[path.length - 1]}</p>
      </div>
    </div>
  );
};

export default AlgProgressRow;
