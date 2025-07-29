import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useGraph } from "../context/GraphContext";
import { useEdges } from "../context/EdgesContext";
import { toast } from "sonner";

interface EdgeLabelInputProps {
  position: { x: number; y: number };
  setIsOpen: (val: boolean) => void;
  id: string | null;
}

const EdgeLabelInput = ({ position, setIsOpen, id }: EdgeLabelInputProps) => {
  const { graph } = useGraph();
  const { setEdgeLabel } = useEdges();
  const [inputValue, setInputValue] = useState<string>(
    graph.getEdgeAttribute(id, "label") || "",
  );

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const handleSetEdgeLabel = (id: string | null, label: string) => {
    if (!id) return;
    setEdgeLabel(id, label);
    setIsOpen(false);
    console.log(
      "Edge label set:",
      id,
      label,
      graph.getEdgeAttribute(id, "label"),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className="absolute flex max-w-[200px] items-center justify-between gap-2 rounded-md border border-input bg-background p-2.5 shadow-sm"
      style={{
        top: position.y,
        left: position.x,
        zIndex: 1000,
      }}
    >
      <Input
        type="text"
        onChange={(e) => handleInputChange(e)}
        value={inputValue}
        placeholder="Nový label hrany"
      />
      <Button onClick={() => handleSetEdgeLabel(id, inputValue)}>OK</Button>
    </div>
  );
};

export default EdgeLabelInput;
