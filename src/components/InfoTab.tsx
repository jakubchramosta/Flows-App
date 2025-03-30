import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useRef } from "react";

interface InfoTabProps {
  setShowInfo: (val: boolean) => void;
}

const InfoTab = ({ setShowInfo }: InfoTabProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    setShowInfo(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className="absolute bottom-20 left-3 max-w-[calc(100vw/3)] rounded-md border border-input bg-background p-2.5 shadow-sm"
    >
      <p>Info</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus
        quis nisi vitae pharetra. Nam ut erat lectus. Aenean faucibus augue
        nisl, sit amet finibus erat vestibulum ac. Etiam eget convallis dui, vel
        varius leo. Duis blandit ex vel pretium faucibus. Morbi faucibus, massa
        elementum scelerisque luctus, risus enim suscipit risus, a dapibus mi
        lacus et nulla. Integer vel sodales elit. Nam id feugiat ante.
        Pellentesque tincidunt ac ipsum in pharetra. Nulla imperdiet nisl dui,
        in porttitor ipsum dapibus vitae. Pellentesque blandit arcu eget congue
        vehicula. Pellentesque ac justo bibendum, auctor nisl sit amet,
        tincidunt ex.
      </p>
    </div>
  );
};

export default InfoTab;
