import { PropsWithChildren } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

interface EdgeContextMenuProps extends PropsWithChildren {}

const EdgeContextMenu: React.FC<EdgeContextMenuProps> = ({ children }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Změnit kapacitu</ContextMenuItem>
        <ContextMenuItem>Odstranit hranu</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EdgeContextMenu;
