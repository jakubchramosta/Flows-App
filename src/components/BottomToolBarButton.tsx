import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface BottomToolBarButtonProps {
  variant:
    | "outline"
    | "default"
    | "link"
    | "destructive"
    | "secondary"
    | "ghost";
  size: "icon" | "rounded" | "default";
  icon: React.ReactNode;
  tooltipText: string;
  onClick: (e: any) => void;
}

const BottomToolBarButton = ({
  icon,
  variant,
  size,
  tooltipText,
  onClick,
}: BottomToolBarButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} size={size} onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="rounded-md border border-input bg-white p-2.5 text-black shadow-sm">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};

export default BottomToolBarButton;
