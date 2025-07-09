import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";

const InfoTabContentTrainingMode = () => {
  return (
    <>
      <ul className="pl-5 space-y-2 list-disc">
        <h1 className="text-lg underline">
          <strong>Režim tréninku</strong>
        </h1>
        <li>
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
          záložky pro přepínání mezi jednotlivými grafy. Každý graf je spravován
          samostatně.
        </li>
        <li>
          <strong>Info menu grafu:</strong> Lze otevřít kliknutím na talčítko v
          pravém horním rohu. Zde se vybírá metoda výpočtu maximálního toku.
          Rovněž tu jsou zobrazeny aktuální výsledky –
          <strong> velikost maximálního toku</strong> a jednotlivé
          <strong> nalezené cesty</strong>. Kliknutím na cestu lze zobrazit její
          průběh.
        </li>
        <li>
          <strong>Práce s přednastavenými grafy:</strong> Ve spodní liště vlevo
          je umístěna
          <strong> roletka</strong> s předdefinovanými grafy, které se po
          kliknutí vykreslí.
        </li>
        <li>
          <strong>Ovládání krokování:</strong> Ve spodní části aplikace se
          nachází
          <strong> ovládací prvky</strong> pro krokování výpočtu:
          <ul className="pl-5 list-disc list-inside">
            <li className="flex items-center">
              <PlayIcon className="mr-2" /> Spustí celý výpočet maximálního
              toku.
            </li>
            <li className="flex items-center">
              <ArrowLeftIcon className="mr-2" />
              <ArrowRightIcon className="mx-2" /> Přepínání zpět a vpřed mezi
              jednotlivými nalezenými cestami.
            </li>
            <li className="flex items-center">
              <RotateCcwIcon className="mr-2" /> Restartuje aktuální graf.
            </li>
            <li className="flex items-center">
              <Trash2Icon className="mr-2" /> Odstraní aktuální graf.
            </li>
          </ul>
        </li>
      </ul>
      <p className="mt-4">
        Pro začátek stačí kliknout na tlačítko
        <strong> Play</strong>. A provede se v základu nastavený alforitmus
        Ford-Fulkerson na aktuálním grafu.
      </p>
    </>
  );
};

export default InfoTabContentTrainingMode;
