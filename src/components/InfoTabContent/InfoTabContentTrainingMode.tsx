import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  PlayIcon,
  PlusIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const InfoTabContentTrainingMode = () => {
  return (
    <ScrollArea className="h-[calc(100vh/1.95)]">
      <ul className="pl-5 space-y-2 list-disc">
        <h1 className="text-lg underline">
          <strong>Režim tréninku</strong>
        </h1>
        <li>
          V tréninkovém režimu si můžete vyzkoušet{" "}
          <strong>vlastní řešení</strong> problému maximálního toku.
        </li>
        <li>Kliknutím na hranu ji označíte.</li>
        <li>Takto si označte celou cestu, kterou chcete přidat do řešení.</li>
        <li>
          Následně zmáčkněte tlačítko{" "}
          <PlusIcon className="inline mx-1" size={16} /> a minimální tok cesty
          se připočte k aktuálnímu maximálnímu toku.
        </li>
        <li>
          V pravém horním rohu se nachází panel zobrazující aktuální maximální
          tok a jednotlivé cesty, které byly přidány do řešení.
        </li>
        <li>
          Ve chvíli kdy si myslíte, že jste našli maximální tok klikněte na
          tlačítko <CheckIcon className="inline mx-1" size={16} /> pro
          vyhodnocení správnosti.
        </li>
        <li>
          <strong>Ovládání tvorby vlastního řešení:</strong> Ve spodní části
          aplikace se nachází
          <strong> ovládací prvky:</strong>
          <ul className="pl-5 list-inside">
            <li className="flex items-center">
              <ArrowLeftIcon className="mr-2" /> Krok zpět - odmaže poslední
              nakliknutou hranu.
            </li>
            <li className="flex items-center">
              <PlusIcon className="mr-2" /> Přidá uživatelem vybranou cestu do
              maximálního toku.
            </li>
            <li className="flex items-center">
              <RotateCcwIcon className="mr-2" /> Restartuje celý trénink.
            </li>
            <li className="flex items-center">
              <CheckIcon className="mr-2" /> Zkontroluje aktuální řešení
              uživatele a zobrazí hodnocení.
            </li>
            <li>
              <span className="inline-flex items-center justify-center h-10 px-4 py-2 my-1 text-sm font-medium border rounded-md w-fit border-input bg-background ring-offset-background">
                Zobrazit reziduální hrany
              </span>{" "}
              V aktuálním grafu zobrazí reziduální hrany
            </li>
          </ul>
        </li>
      </ul>
      <p className="mt-4">
        Pro přepnutí do režimu editace klikněte na tlačítko{" "}
        <strong>Editace</strong> v levém horním rohu.
      </p>
    </ScrollArea>
  );
};

export default InfoTabContentTrainingMode;
