import { ArrowRight } from "lucide-react";
import SquareWrapper from "./SquareWrapper";

const AlgProgressRow = () => {
  return (
    <div className="flex items-center justify-between gap-1">
      <p>1.</p>
      <div className="flex items-center gap-x-0.5">
        <SquareWrapper>
          <p>a</p>
        </SquareWrapper>
        <ArrowRight size={14} />
        <SquareWrapper>
          <p>b</p>
        </SquareWrapper>
        <ArrowRight size={14} />
        <SquareWrapper>
          <p>b</p>
        </SquareWrapper>
        <ArrowRight size={14} />
        <SquareWrapper>
          <p>b</p>
        </SquareWrapper>
      </div>
      <p className="font-bold">=</p>
      <div className="grid h-5 w-5 place-content-center rounded-full border border-input bg-background text-sm shadow-sm">
        <p>4</p>
      </div>
    </div>
  );
};

export default AlgProgressRow;
