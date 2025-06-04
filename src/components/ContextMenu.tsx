import { useContext, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useNodes } from "../context/NodesContext";
import { useEdges } from "../context/EdgesContext";
import {
  MoveLeft,
  MoveLeftIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UndoIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Colors, EdgeTypes } from "./utils/consts";
import { ColorDot } from "./ColorDot";

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  setIsOpen: (val: boolean) => void;
  setInputMenuOpen: (val: boolean) => void;
  isNode: boolean;
  id: string | null;
}

const ContextMenu = ({
  isOpen,
  position,
  setIsOpen,
  setInputMenuOpen,
  isNode,
  id,
}: ContextMenuProps) => {
  const { removeNode, setSource, setSink } = useNodes();
  const {
    removeEdge,
    setFirstNodeInEdge,
    setAddingEdgeMode,
    setEdgeType,
    setEdgeColor,
  } = useEdges();

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
    toast.info("Klikněte na jiný BOD kam hrana povede.");
  };

  const handleMakrAsSource = (id: string | null) => {
    if (!id) return;
    setSource(id);
    setIsOpen(false);
  };

  const handleMarkAsSink = (id: string | null) => {
    if (!id) return;
    setSink(id);
    setIsOpen(false);
  };

  const handleCapacityChangeOnClick = () => {
    setInputMenuOpen(true);
    setIsOpen(false);
  };

  const handleSetEdgeColor = (id: string | null, color: string) => {
    if (!id) return;
    setEdgeColor(id, color);
    setIsOpen(false);
  };

  const handleSetEdgeType = (id: string | null, type: string) => {
    if (!id) return;
    setEdgeType(id, type);
    setIsOpen(false);
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
                className="flex w-44 justify-between"
                onClick={() => handleFirstNodeForEdge(id)}
              >
                Přidat hanu <PlusIcon />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-44 justify-between"
                onClick={() => handleMakrAsSource(id)}
              >
                Označit jako ZDROJ
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-44 justify-between"
                onClick={() => handleMarkAsSink(id)}
              >
                Označit jako CÍL
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-44 justify-between"
                onClick={() => handleRemoveNode(id)}
              >
                Odstranit bod <Trash2Icon />
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                className="flex w-36 justify-between"
                onClick={() => handleCapacityChangeOnClick()}
              >
                Změnit kapacitu <PencilIcon />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-36 justify-between"
                onClick={() => handleSetEdgeType(id, EdgeTypes.STRAIGHT)}
              >
                Narovnat <MoveLeftIcon />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-36 justify-between"
                onClick={() => handleSetEdgeType(id, EdgeTypes.CURVED)}
              >
                Zakřivit <UndoIcon />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-36 justify-between"
                onClick={() => handleSetEdgeColor(id, Colors.GREEN_EDGE)}
              >
                Obarvit na <ColorDot color={Colors.GREEN_EDGE} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-36 justify-between"
                onClick={() => handleSetEdgeColor(id, Colors.RED_EDGE)}
              >
                Obarvit na <ColorDot color={Colors.RED_EDGE} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-36 justify-between"
                onClick={() => handleSetEdgeColor(id, Colors.DEFAULT_EDGE)}
              >
                Obarvit na <ColorDot color={Colors.DEFAULT_EDGE} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-36 justify-between"
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
