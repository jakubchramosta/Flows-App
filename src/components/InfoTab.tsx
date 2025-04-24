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
      <div className="p-3">
        <p>
          Vítejte v aplikaci <strong>Flows App</strong>, která slouží k
          vizualizaci a výpočtu maximálního toku v síti pomocí různých
          algoritmů. Aplikace umožňuje:
        </p>
        <ul className="pl-5 list-disc">
          <li>
            <strong>Vytvářet vlastní grafy:</strong> Přidávejte uzly dvouklikem
            <strong>LMB</strong> a hrany kliknutím <strong>RMB</strong> na bod,
            nastavujte kapacity a definujte zdroj a cíl toku.
          </li>
          <li>
            <strong>Spouštět algoritmy:</strong> Vyberte si z algoritmů jako
            Ford-Fulkerson nebo Edmonds-Karp a sledujte postup výpočtu.
          </li>
          <li>
            <strong>Upravovat graf:</strong> Měňte kapacity hran kliknutím{" "}
            <strong>RMB</strong> na hranu, přidávejte nebo odstraňujte uzly a
            hrany podle potřeby.
          </li>
        </ul>
        <p>
          Pro začátek nastavte <strong>zdroj</strong> a <strong>cíl</strong>{" "}
          toku, přidejte hrany s kapacitami a spusťte algoritmus tlačítkem{" "}
          <strong>Play</strong>.
        </p>
      </div>
      <hr className="my-2 border-t border-gray-300" />
      <p className="text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} Flows App
      </p>
    </div>
  );
};

export default InfoTab;
