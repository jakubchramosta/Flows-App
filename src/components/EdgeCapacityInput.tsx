import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useGraph } from "../context/GraphContext";
import { useEdges } from "../context/EdgesContext";
import { toast } from "sonner";

interface EdgeCapacityInputProps {
  position: { x: number; y: number };
  setIsOpen: (val: boolean) => void;
  id: string | null;
}

const EdgeCapacityInput = ({
  position,
  setIsOpen,
  id,
}: EdgeCapacityInputProps) => {
  const { graph } = useGraph();
  const { setEdgeCapacity } = useEdges();
  const [inputValue, setInputValue] = useState<number>(
    graph.getEdgeAttribute(id, "capacity") || 0,
  );

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const handleSetEdgeCapacity = (id: string | null, capacity: number) => {
    if (!id) return;
    setEdgeCapacity(id, capacity);
    setIsOpen(false);
    console.log(
      "Edge capacity set:",
      id,
      capacity,
      graph.getEdgeAttribute(id, "capacity"),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setInputValue(value);
      return;
    }
    toast.error("Invalid input. Please enter a number.");
  };

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className="absolute flex max-w-[150px] items-center justify-between gap-2 rounded-md border border-input bg-background p-2.5 shadow-sm"
      style={{
        top: position.y,
        left: position.x,
        zIndex: 1000,
      }}
    >
      <Input
        type="number"
        onChange={(e) => handleInputChange(e)}
        value={inputValue}
      />
      <Button onClick={() => handleSetEdgeCapacity(id, inputValue)}>OK</Button>
    </div>
  );
};

export default EdgeCapacityInput;
