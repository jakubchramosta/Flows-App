import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useContext, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import GraphContext from "../context/GraphContext";
import { toast } from "sonner";

interface EdgeCapacityInputProps {
  isOpen: boolean;
  position: { x: number; y: number };
  setIsOpen: (val: boolean) => void;
  id: string | null;
}

const EdgeCapacityInput = ({
  isOpen,
  position,
  setIsOpen,
  id,
}: EdgeCapacityInputProps) => {
  const { graph, setEdgeCapacity } = useContext(GraphContext);
  const [inputValue, setInputValue] = useState<number>(0);

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
      className="absolute flex items-center justify-between gap-2 rounded-md border border-input bg-background p-2.5 shadow-sm"
      style={{
        display: isOpen ? "flex" : "none",
        top: position.y,
        left: position.x,
        zIndex: 1000,
      }}
    >
      <Input type="number" onChange={(e) => handleInputChange(e)} />
      <Button onClick={() => handleSetEdgeCapacity(id, inputValue)}>OK</Button>
    </div>
  );
};

export default EdgeCapacityInput;
