import { ArrowRight } from "lucide-react";
import SquareWrapper from "./SquareWrapper";
import React from "react";
import { useSnapshot } from "../context/SnapshotContext";

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
  const { showSelectedSnapshot } = useSnapshot();

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
      <div className="grid h-5 w-5 place-content-center rounded-full border border-input bg-background p-3 text-base shadow-sm">
        <p className="font-bold">{path.flow}</p>
      </div>
    </button>
  );
};

export default AlgProgressRow;
