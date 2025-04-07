import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  setIsOpen: (val: boolean) => void;
  isNode: boolean;
}

const ContextMenu = ({
  isOpen,
  position,
  setIsOpen,
  isNode,
}: ContextMenuProps) => {
  console.log("ContextMenu", isOpen, position);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
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
              <DropdownMenuItem>node</DropdownMenuItem>
              <DropdownMenuItem>node</DropdownMenuItem>
              <DropdownMenuItem>node</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>edge</DropdownMenuItem>
              <DropdownMenuItem>edge</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ContextMenu;
