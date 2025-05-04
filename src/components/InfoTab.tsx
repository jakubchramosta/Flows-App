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
      className="absolute bottom-20 left-3 max-w-[calc(100vw/1.5)] rounded-md border border-input bg-background p-2.5 shadow-sm"
    >
      <div className="p-3">
        <p>
          Vítejte v aplikaci <strong>Flows App</strong>, sloužící k vizualizaci
          a výpočtu <strong>maximálního toku v síti</strong>.
        </p>
        <hr className="my-2 border-t border-gray-300" />
        <ul className="pl-5 space-y-2 list-disc">
          <li>
            <strong>Vytváření vlastních grafů a jejich úprava:</strong> Uzly se
            přidávají dvojklikem
            <strong> levým tlačítkem myši (LMB)</strong>. Kliknutím
            <strong> pravým tlačítkem myši (RMB)</strong> na bod/hranu lze
            otevřít kontextové menu. V něm se nacházejí tlačíta pro úpravu hran
            (např. změnu kapacity) nebo uzlů. Možnosti zahrnují i nastavení
            zdroje/cíle a odstranění prvků. Kontextové menu také umožňuje
            nastavovat
            <strong> kapacitu hran</strong>, označit uzly jako
            <strong> zdroj</strong> nebo <strong>cíl</strong>, případně uzly a
            hrany <strong>odstraňovat</strong>.
            <ul className="pl-5 list-disc list-inside">
              <li>
                <strong>Vytvoření hrany:</strong> kliknutím
                <strong> (RMB)</strong> na uzlu – vyberte možnost
                <em> „Přidat hranu“</em>a poté klikněte na cílový uzel.
              </li>
            </ul>
          </li>
          <li>
            <strong>Správa více grafů:</strong> V levém horním rohu se nachází
            záložky pro přepínání mezi jednotlivými grafy. Každý graf je
            spravován samostatně.
          </li>
          <li>
            <strong>Info menu grafu:</strong> Lze otevřít kliknutím na talčítko
            v pravém horním rohu. Zde se vybírá metoda výpočtu maximálního toku.
            Rovněž tu jsou zobrazeny aktuální výsledky –
            <strong> velikost maximálního toku</strong> a jednotlivé
            <strong> nalezené cesty</strong>. Kliknutím na cestu lze zobrazit
            její průběh.
          </li>
          <li>
            <strong>Práce s přednastavenými grafy:</strong> Ve spodní liště
            vlevo je umístěna
            <strong> roletka</strong> s předdefinovanými grafy, které se po
            kliknutí vykreslí.
          </li>
          <li>
            <strong>Ovládání krokování:</strong> Ve spodní části aplikace se
            nachází
            <strong> ovládací prvky</strong> pro krokování výpočtu:
            <ul className="pl-5 list-disc list-inside">
              <li>
                <strong>Play:</strong> Spustí celý výpočet maximálního toku.
              </li>
              <li>
                <strong>Šipky vpřed/vzad:</strong> Krokování mezi jednotlivými
                nalezenými cestami.
              </li>
              <li>
                <strong>Rotující šipka:</strong> Restartuje aktuální graf.
              </li>
            </ul>
            <li>
              <strong>Koš:</strong> Odstraní aktuální graf.
            </li>
          </li>
        </ul>
        <p className="mt-4">
          Pro začátek stačíkliknout na tlačítko
          <strong> Play</strong>. A provede se v základu nastavený alforitmus
          Ford-Fulkerson na aktuálním grafu.
        </p>
        <hr className="my-2 border-t border-gray-300" />
        <p className="mt-4 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} Flows App
        </p>
      </div>
    </div>
  );
};

export default InfoTab;
