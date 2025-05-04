import { ArrowRight } from "lucide-react";
import SquareWrapper from "./SquareWrapper";
import React, { useContext } from "react";
import GraphContext from "../context/GraphContext";

interface AlgProgressRowProps {
  path: {
    path: string[];
    flow: number;
  };
  label: number;
  isActive: boolean;
  index: number;
}

const AlgProgressRow: React.FC<AlgProgressRowProps> = ({
  path,
  label,
  isActive,
  index,
}) => {
  const { showSelectedSnapshot } = useContext(GraphContext);

  return (
    <button
      className={`flex items-center justify-between gap-1 rounded-md px-2 py-1 ${
        isActive ? "bg-blue-100" : ""
      }`}
      onClick={() => {
        showSelectedSnapshot(index);
      }}
    >
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
    </button>
  );
};

export default AlgProgressRow;
