import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const InfoTabContentEditationMode = () => {
  return (
    <ScrollArea className="h-[calc(100vh/1.95)]">
      <ul className="pl-5 space-y-2 list-disc">
        <h1 className="text-lg underline">
          <strong>Režim editace grafu</strong>
        </h1>
        <li>
          <strong>Vytváření vlastních grafů a jejich úprava:</strong> Uzly se
          přidávají dvojklikem
          <strong> levým tlačítkem myši (LMB)</strong>. Kliknutím
          <strong> pravým tlačítkem myši (RMB)</strong> na bod/hranu lze otevřít
          kontextové menu. V něm se nacházejí tlačíta pro úpravu hran (např.
          změnu kapacity) nebo uzlů. Možnosti zahrnují i nastavení zdroje/cíle a
          odstranění prvků. Kontextové menu také umožňuje nastavovat
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
          </ul>
        </li>
        <li>
          <strong>Ostatní ovládací prvky:</strong>
          <ul className="pl-5 list-inside">
            <li>
              <span className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium border rounded-md w-fit border-input bg-background ring-offset-background">
                Export
              </span>{" "}
              vyexportuje aktuálně zobrazený graf
            </li>
            <li>
              <span className="inline-flex items-center justify-center h-10 px-4 py-2 my-2 text-sm font-medium border rounded-md w-fit border-input bg-background ring-offset-background">
                Import
              </span>{" "}
              naimportuje graf ze souboru .json
            </li>
            <li className="flex items-center">
              <Trash2Icon className="mr-2" /> Odstraní aktuální graf.
            </li>
          </ul>
        </li>
      </ul>
      <p className="mt-4">
        Pro rychlý start klikněte na tlačítko
        <PlayIcon className="inline-block mx-1 align-middle" size={16} />
        <strong>Play</strong> a spustí se výchozí algoritmus Ford-Fulkerson na
        aktuálním grafu. Alternativně se můžete přepnout do režimu tréninku
        tlačítkem <strong>Trénink</strong> v levém horním rohu a vyzkoušet si
        vlastní řešení.
      </p>
    </ScrollArea>
  );
};

export default InfoTabContentEditationMode;
