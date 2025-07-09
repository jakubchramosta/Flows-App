import { useTraining } from "../context/TrainingContext";
import InfoTabContentEditationMode from "./InfoTabContent/InfoTabContentEditationMode";
import InfoTabContentTrainingMode from "./InfoTabContent/InfoTabContentTrainingMode";

const InfoTab = () => {
  const { editationMode } = useTraining();

  return (
    <div className="absolute bottom-20 left-3 max-h-[calc(100vh/1.5)] max-w-[calc(100vw/1.25)] rounded-md border border-input bg-background p-2.5 shadow-sm">
      <div className="p-3">
        <p>
          Vítejte v aplikaci <strong>Flows App</strong>, sloužící k vizualizaci,
          výpočtu a tréninku vyhledávání{" "}
          <strong>maximálního toku v síti</strong>.
        </p>
        <hr className="my-2 border-t border-gray-300" />
        {editationMode ? (
          <InfoTabContentEditationMode />
        ) : (
          <InfoTabContentTrainingMode />
        )}
        <hr className="my-2 border-t border-gray-300" />
        <p className="mt-4 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} Flows App
        </p>
      </div>
    </div>
  );
};

export default InfoTab;
