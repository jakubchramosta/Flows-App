import { useContext, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import GraphContext from "../context/GraphContext";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  setIsOpen: (val: boolean) => void;
  isNode: boolean;
  id: string | null;
}

const ContextMenu = ({
  isOpen,
  position,
  setIsOpen,
  isNode,
  id,
}: ContextMenuProps) => {
  const { removeEdge, removeNode, setFirstNodeInEdge, setAddingEdgeMode } =
    useContext(GraphContext);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const handleRemoveEdge = (id: string | null) => {
    if (!id) return;
    removeEdge(id);
    setIsOpen(false);
  };

  const handleRemoveNode = (id: string | null) => {
    if (!id) return;
    removeNode(id);
    setIsOpen(false);
  };

  const handleFirstNodeForEdge = (id: string | null) => {
    if (!id) return;
    setAddingEdgeMode(true);
    setFirstNodeInEdge(id);
    setIsOpen(false);
    console.log("firstNodeInEdge", id);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <DropdownMenu open={isOpen}>
        <DropdownMenuContent
          ref={ref}
          className="absolute"
          style={{ top: position.y, left: position.x, zIndex: 1000 }}
        >
          {isNode ? (
            <>
              <DropdownMenuItem
                className="flex justify-between w-44"
                onClick={() => handleFirstNodeForEdge(id)}
              >
                Přidat hanu <PlusIcon />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between w-44">
                Přejmenovat <PencilIcon />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between w-44">
                Označit jako START
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between w-44">
                Označit jako CÍL
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between w-44"
                onClick={() => handleRemoveNode(id)}
              >
                Odstranit bod <Trash2Icon />
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem className="flex justify-between w-36">
                Změnit kapacitu <PencilIcon />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between w-36"
                onClick={() => handleRemoveEdge(id)}
              >
                Odstranit hranu <Trash2Icon />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ContextMenu;
